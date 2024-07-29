const dotenv = require('dotenv');
const colors = require('colors');
const db = require('../config/db');

const Users = require('../models/User');
const Actions = require('../models/Action');
const PageVisits = require('../models/PageVisit');

dotenv.config();
db.setup();

const deleteTables = async () => {
  try {
    await Users.destroy();
    await Actions.destroy();
    await PageVisits.destroy();

    console.log('Tables Deleted!'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

deleteTables();
