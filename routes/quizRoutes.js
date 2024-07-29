const express = require('express');

const { saveQuizRetries } = require('../controllers/quiz');
const { protect } = require('../middleware/auth');

const router = express.Router();
router.route('/retries').post(protect, saveQuizRetries);

module.exports = router;
