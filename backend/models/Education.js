const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
    trim: true
  },
  institution: {
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
    default: ''
  },
  orderIndex: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Education', EducationSchema);
