const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  ip: {
    type: String,
    default: 'Unknown'
  },
  city: {
    type: String,
    default: 'Unknown'
  },
  region: {
    type: String,
    default: 'Unknown'
  },
  country: {
    type: String,
    default: 'Unknown'
  },
  countryCode: {
    type: String,
    default: ''
  },
  isp: {
    type: String,
    default: 'Unknown'
  },
  userAgent: {
    type: String,
    default: 'Unknown'
  },
  referer: {
    type: String,
    default: 'Direct'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Visit', VisitSchema);
