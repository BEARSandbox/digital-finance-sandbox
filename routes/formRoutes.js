const express = require('express');

const { saveFormData, saveSurveyCode } = require('../controllers/form');
const { protect } = require('../middleware/auth');

const router = express.Router();
router.route('/form-data').post(protect, saveFormData);
router.route('/survey-code').post(protect, saveSurveyCode);

module.exports = router;
