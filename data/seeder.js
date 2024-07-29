const dotenv = require('dotenv');
const colors = require('colors');
const db = require('../config/db');
const { importData, destroyData } = require('../utils/dbHelpers');

// grant access to env vars
dotenv.config();
db.setup();

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
