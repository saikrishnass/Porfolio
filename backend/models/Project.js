const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  githubLink: {
    type: String,
    default: ''
  },
  liveLink: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
