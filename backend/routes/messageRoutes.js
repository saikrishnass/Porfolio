const express = require('express');
const router = express.Router();
const { submitMessage, getMessages, deleteMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(submitMessage)
  .get(protect, getMessages);

router.route('/:id')
  .delete(protect, deleteMessage);

module.exports = router;
