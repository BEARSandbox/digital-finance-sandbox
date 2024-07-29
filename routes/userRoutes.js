const express = require('express');

const {
  getUsers,
  authAdmin,
  generateUser,
  consent,
} = require('../controllers/users');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getUsers);
router.route('/login').post(authAdmin);
router.route('/generate-user').post(generateUser);
router.route('/consent').post(protect, consent);

module.exports = router;
