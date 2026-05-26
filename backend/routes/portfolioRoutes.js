const express = require('express');
const router = express.Router();
const {
  getSkills,
  createSkill,
  deleteSkill,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

// Skills routes
router.route('/skills')
  .get(getSkills)
  .post(protect, createSkill);
router.route('/skills/:id')
  .delete(protect, deleteSkill);

// Projects routes
router.route('/projects')
  .get(getProjects)
  .post(protect, createProject);
router.route('/projects/:id')
  .put(protect, updateProject)
  .delete(protect, deleteProject);

// Experience routes
router.route('/experience')
  .get(getExperiences)
  .post(protect, createExperience);
router.route('/experience/:id')
  .put(protect, updateExperience)
  .delete(protect, deleteExperience);

// Education routes
router.route('/education')
  .get(getEducation)
  .post(protect, createEducation);
router.route('/education/:id')
  .put(protect, updateEducation)
  .delete(protect, deleteEducation);

module.exports = router;
