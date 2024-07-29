const dotenv = require('dotenv');
const colors = require('colors');
const db = require('../config/db');

const Users = require('../models/User');
const Actions = require('../models/Action');
const PageVisits = require('../models/PageVisit');

dotenv.config();
db.setup();

const createTables = async () => {
  try {
    await Users.create();
    await Actions.create();
    await PageVisits.create();

    console.log('Tables Created!'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

createTables();
