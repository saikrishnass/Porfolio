const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Database', 'AI / Tools', 'Core Areas'],
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
