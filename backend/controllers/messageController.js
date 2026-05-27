const Message = require('../models/Message');

// @desc    Submit contact message
// @route   POST /api/messages
// @access  Public
const submitMessage = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const newMessage = new Message({ name, email, message });
    const savedMessage = await newMessage.save();

    // Telegram Bot Webhook Integration
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const telegramText = `🔔 *New Portfolio Message!*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n\n💬 *Message:*\n${message}`;

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
        console.error('Telegram notification failed:', telegramErr.message);
      }
    }

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = async (req, res) => {
  try {
    const messageObj = await Message.findById(req.params.id);
    if (messageObj) {
      await Message.deleteOne({ _id: req.params.id });
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitMessage,
  getMessages,
  deleteMessage,
};
