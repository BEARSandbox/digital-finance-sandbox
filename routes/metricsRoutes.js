const express = require('express');

const { savePageData, saveActionData } = require('../controllers/metrics');
const { protect } = require('../middleware/auth');

const router = express.Router();
router.route('/page-data').post(protect, savePageData);
router.route('/action-data').post(protect, saveActionData);

module.exports = router;
