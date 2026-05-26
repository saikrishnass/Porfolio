const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  orderIndex: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
