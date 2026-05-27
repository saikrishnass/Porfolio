const Visit = require('../models/Visit');

// Helper to clean IP address
const getClientIp = (req) => {
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;
  if (ip && ip.includes(',')) {
    ip = ip.split(',')[0].trim();
  }
  // Strip IPv6 prefix if present for IPv4 mapped address
  if (ip && ip.startsWith('::ffff:')) {
    ip = ip.substring(7);
  }
  return ip;
};

// Helper to check if IP is private or local loopback
const isPrivateIp = (ip) => {
  if (!ip) return true;
  return (
    ip === '::1' ||
    ip === '127.0.0.1' ||
    ip === 'localhost' ||
    ip.startsWith('10.') ||
    ip.startsWith('192.168.') ||
    (ip.startsWith('172.') && parseInt(ip.split('.')[1]) >= 16 && parseInt(ip.split('.')[1]) <= 31)
  );
};

// Helper to parse User Agent into human readable device description
const parseUserAgent = (ua) => {
  if (!ua || ua === 'Unknown') return 'Unknown Device';
  
  let os = 'Unknown OS';
  let browser = 'Unknown Browser';

  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Macintosh')) os = 'macOS';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('Linux')) os = 'Linux';

  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';

  return `${browser} on ${os}`;
};

// @desc    Record website visit
// @route   POST /api/visits
// @access  Public
const recordVisit = async (req, res) => {
  let ip = getClientIp(req);
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const referer = req.headers['referer'] || 'Direct';

  // For private local balancer IPs (Render, AWS) or local testing, query public outbound IP
  if (isPrivateIp(ip)) {
    try {
      const ipifyRes = await fetch('https://api.ipify.org?format=json');
      const ipifyData = await ipifyRes.json();
      if (ipifyData && ipifyData.ip) {
        ip = ipifyData.ip;
      }
    } catch (e) {
      console.warn('Could not fetch outbound public IP for private/local connection:', e.message);
    }
  }

  let geoData = {
    city: 'Unknown',
    region: 'Unknown',
    country: 'Unknown',
    countryCode: '',
    isp: 'Unknown'
  };

  // Perform GeoIP lookup if we resolved a valid public IP
  if (ip && !isPrivateIp(ip)) {
    // Try HTTPS-native FreeIPAPI first (datacenter safe, SSL certified)
    try {
      const geoRes = await fetch(`https://freeipapi.com/api/json/${ip}`);
      if (geoRes.ok) {
        const geoJson = await geoRes.json();
        geoData = {
          city: geoJson.cityName || 'Unknown',
          region: geoJson.regionName || 'Unknown',
          country: geoJson.countryName || 'Unknown',
          countryCode: geoJson.countryCode || '',
          isp: 'Outbound ISP'
        };
      } else {
        throw new Error(`HTTP error status ${geoRes.status}`);
      }
    } catch (e) {
      console.warn('Primary FreeIPAPI lookup failed, trying fallback...', e.message);
      
      // Fallback to IP-API (HTTP)
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
        const geoJson = await geoRes.json();
        if (geoJson && geoJson.status === 'success') {
          geoData = {
            city: geoJson.city || 'Unknown',
            region: geoJson.regionName || 'Unknown',
            country: geoJson.country || 'Unknown',
            countryCode: geoJson.countryCode || '',
            isp: geoJson.isp || 'Unknown'
          };
        }
      } catch (fallbackErr) {
        console.error('All GeoIP lookup endpoints failed:', fallbackErr.message);
      }
    }
  }

  // Anti-spam & React StrictMode double-mount guard:
  // Check if a visit from the same IP has been logged within the last 10 seconds
  const tenSecondsAgo = new Date(Date.now() - 10000);
  try {
    const duplicateVisit = await Visit.findOne({
      ip,
      createdAt: { $gte: tenSecondsAgo }
    });

    if (duplicateVisit) {
      // Gracefully return the existing visit, skipping duplicate DB writes & Telegram notifications
      return res.status(200).json(duplicateVisit);
    }
  } catch (err) {
    console.error('Duplicate visit check failed:', err.message);
  }

  try {
    const newVisit = new Visit({
      ip,
      city: geoData.city,
      region: geoData.region,
      country: geoData.country,
      countryCode: geoData.countryCode,
      isp: geoData.isp,
      userAgent,
      referer
    });

    const savedVisit = await newVisit.save();

    // Trigger Telegram Bot Alert
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const device = parseUserAgent(userAgent);
      const flag = geoData.countryCode ? ` ${geoData.countryCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))}` : '';
      
      const telegramText = `👁️ *New Portfolio Visitor!*\n\n📍 *Location:* ${geoData.city}, ${geoData.region}, ${geoData.country}${flag}\n🏢 *ISP:* ${geoData.isp}\n📱 *Device:* ${device}\n🔗 *Referrer:* ${referer}\n🌐 *IP:* ${ip}`;

      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: telegramText,
            parse_mode: 'Markdown',
          }),
        });
      } catch (telegramErr) {
        console.error('Telegram visitor alert failed:', telegramErr.message);
      }
    }

    res.status(201).json(savedVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get visit stats
// @route   GET /api/visits/stats
// @access  Private
const getVisitStats = async (req, res) => {
  try {
    const totalVisits = await Visit.countDocuments({});
    const uniqueIps = await Visit.distinct('ip');
    
    // Get latest 10 visits
    const latestVisits = await Visit.find({}).sort({ createdAt: -1 }).limit(10);
    
    res.json({
      totalVisits,
      uniqueVisitors: uniqueIps.length,
      latestVisits
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  recordVisit,
  getVisitStats
};
