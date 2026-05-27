const express = require('express');
const router = express.Router();
const { recordVisit, getVisitStats } = require('../controllers/visitController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(recordVisit);

router.route('/stats')
  .get(protect, getVisitStats);

module.exports = router;
