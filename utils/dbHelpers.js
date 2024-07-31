const Users = require('../models/User');
const Actions = require('../models/Action');
const PageVisits = require('../models/PageVisit');

const importData = async () => {
  try {
    const epochTime = Date.now();

    // create an admin user with full access
    const mainAdminUser = {
      id: '00000',
      assignmentId: 'ABC',
      createdAt: epochTime,
      os: '',
      browser: '',
      device: '',
      email: 'main_user',
      isAdmin: true,
      hasConsented: true,
      hasDeleteAccess: true,
      factorOne: 0,
      factorTwo: 2, // This factor is no longer used so it is marked as 2 (instead of 0 or 1)
      factorThree: 0,
    };

    // create an admin user with limited access
    const secondaryAdminUser = {
      id: '11111',
      assignmentId: 'ABC',
      createdAt: epochTime,
      os: '',
      browser: '',
      device: '',
      email: 'secondary_user',
      isAdmin: true,
      hasConsented: true,
      hasDeleteAccess: false,
      factorOne: 0,
      factorTwo: 2, // This factor is no longer used so it is marked as 2 (instead of 0 or 1)
      factorThree: 0,
    };

    // insert all users in DB
    await Users.addUserAssignment(mainAdminUser);
    await Users.addUserAssignment(secondaryAdminUser);

    console.log('Data imported!'.green.inverse);
    console.log(`Created admin users in the DB`.green.inverse);
  } catch (err) {
    console.error(`${err}`.red.inverse);
  }
};

const destroyData = async () => {
  try {
    /* REMOVE ENTRIES IN THE USERS TABLE */
    const users = await Users.getAllUserAssignments(['id', 'createdAt']);

    // Have to send in chunks of 25
    let start_indices = [];
    for (let i = 0; i < users.length; i += 25) {
      start_indices.push(i);
    }

    // Add back admin user
    await importData();

    await Promise.all(
      start_indices.map(
        async (start_index) =>
          await Users.removeUserAssignments(
            users.slice(start_index, start_index + 25)
          )
      )
    );

    /* REMOVE ENTRIES IN THE ACTIONS TABLE */
    const actions = await Actions.getAllActions(['id', 'time']);

    start_indices = [];
    for (let i = 0; i < actions.length; i += 25) {
      start_indices.push(i);
    }

    await Promise.all(
      start_indices.map(
        async (start_index) =>
          await Actions.removeActions(
            actions.slice(start_index, start_index + 25)
          )
      )
    );

    /* REMOVE ENTRIES IN THE PAGEVISITS TABLE */
    const pages = await PageVisits.getAllPages(['id', 'start']);

    start_indices = [];
    for (let i = 0; i < pages.length; i += 25) {
      start_indices.push(i);
    }

    await Promise.all(
      start_indices.map(
        async (start_index) =>
          await PageVisits.removePages(
            pages.slice(start_index, start_index + 25)
          )
      )
    );

    console.log('Data deleted!'.green.inverse);
  } catch (err) {
    console.error(`${err}`.red.inverse);
  }
};

const populateData = async () => {
  const arr = [...Array(1000).keys()];

  await Promise.all(
    arr.map(async (timestamp) => {
      const action = {
        id: '12345 100',
        time: timestamp,
        clickedOn: 'Loans - Header',
        type: 'click',
        webpage: '/credit-cards',
      };

      await Actions.addAction(action);
    })
  );
};

module.exports = {
  importData,
  destroyData,
  populateData,
};
