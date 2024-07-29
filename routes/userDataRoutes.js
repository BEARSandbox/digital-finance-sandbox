const express = require('express');

const { getAllData, deleteAllData } = require('../controllers/userData');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/getAll').get(protect, getAllData);
router.route('/deleteAll').delete(protect, deleteAllData);

module.exports = router;
