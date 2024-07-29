const Users = require('../models/User');
const Actions = require('../models/Action');
const PageVisits = require('../models/PageVisit');
const { destroyData } = require('../utils/dbHelpers');

const addScrollInfo = (users, actions) => {
  const usersMapping = {};

  users.forEach((user) => {
    usersMapping[user.id] = user;
    usersMapping[user.id].defaultRateVisibleI = false;
    usersMapping[user.id].defaultRateVisibleJ = false;
    usersMapping[user.id].defaultRateVisibleK = false;
    usersMapping[user.id].defaultRateVisibleL = false;
    usersMapping[user.id].defaultRateVisibleM = false;
    usersMapping[user.id].defaultRateVisibleN = false;
    usersMapping[user.id].defaultRateVisibleO = false;
    usersMapping[user.id].defaultRateVisibleP = false;
  });

  // Check if default rate was ever visible to the user and if so,
  // add that information to the user data CSV file.
  // Only do this for pages that have the schumer box
  const applyPageRegex = /^\/credit-cards\/apply\/card-.$/;
  const schumerBoxPageRegex = /^\/important-fees\/card-.$/;
  const defaultRateVisible = (webpage, pos) =>
    (applyPageRegex.test(webpage) || schumerBoxPageRegex.test(webpage)) &&
    pos >= 17 &&
    pos <= 28;

  actions.forEach((action) => {
    if (
      action.type === 'scroll' &&
      defaultRateVisible(action.webpage, action.position)
    ) {
      let [userId] = action.id.split(' ');

      // has to end with card letter
      const cardLetter = action.webpage[action.webpage.length - 1];
      const key = `defaultRateVisible${cardLetter.toUpperCase()}`;

      usersMapping[userId][key] = true;
    }
  });
};

const getUserData = async (dateRange, actions) => {
  let users = await Users.getAllUserAssignments();

  // Filter by the start date and end date specified
  if (dateRange.startDate) {
    users = users.filter((user) => user.createdAt >= dateRange.startDate);
  }
  if (dateRange.endDate) {
    users = users.filter((user) => user.createdAt < dateRange.endDate);
  }

  addScrollInfo(users, actions);

  // Sort by the time that the entry was created at
  users.sort((a, b) => a.createdAt - b.createdAt);
  return users;
};

const getPageData = async (dateRange) => {
  let pages = await PageVisits.getAllPages();

  // Filter by the start date and end date specified
  if (dateRange.startDate) {
    pages = pages.filter((page) => page.start >= dateRange.startDate);
  }
  if (dateRange.endDate) {
    pages = pages.filter((page) => page.start < dateRange.endDate);
  }

  // Sort by id first and then start time
  pages.sort((a, b) => a.id.localeCompare(b.id) || a.start - b.start);
  return pages;
};

const addPageInfo = (actions, pages) => {
  const pageMapping = {};

  pages.forEach((page) => {
    pageMapping[page.webpageId] = page;
  });

  for (let i = 0; i < actions.length; i++) {
    if (!(actions[i].webpageId in pageMapping)) continue;

    const { start, end } = pageMapping[actions[i].webpageId];
    actions[i].start = start;
    actions[i].end = end;
    pageMapping[actions[i].webpageId].used = true;
  }

  for (webpageId in pageMapping) {
    // Add all pages that have no actions associated with them
    const page = pageMapping[webpageId];
    if (!page.used) {
      actions.push(page);
    }
  }
};

const getActionData = async (dateRange, pages) => {
  let actions = await Actions.getAllActions();

  // Filter by the start date and end date specified
  if (dateRange.startDate) {
    actions = actions.filter((action) => action.time >= dateRange.startDate);
  }
  if (dateRange.endDate) {
    actions = actions.filter((action) => action.time < dateRange.endDate);
  }

  addPageInfo(actions, pages);

  // Sort by id first, then start time
  actions.sort((a, b) => a.id.localeCompare(b.id) || a.start - b.start);
  return actions;
};

// @desc    Fetch all data from the database
// @route   GET /api/users/getAll
// @access  Private
const getAllData = async (req, res) => {
  const dateRange = {
    startDate: req.query.startDate,
    endDate: req.query.endDate,
  };
  let { isAdmin } = req.user;

  // No one besides the admin should have access to all the data
  if (!isAdmin) {
    res.status(401).json({
      message: 'This user is not an admin',
    });
    return;
  }

  const pageDataJSON = await getPageData(dateRange);
  const actionDataJSON = await getActionData(dateRange, pageDataJSON);
  const userDataJSON = await getUserData(dateRange, actionDataJSON);

  res.status(200).json({ userDataJSON, pageDataJSON, actionDataJSON });
};

// @desc    Delete all data from the database (besides admin)
// @route   GET /api/users/deleteAll
// @access  Private
const deleteAllData = async (req, res) => {
  let { isAdmin, hasDeleteAccess } = req.user;

  // No one besides the admin should have access to all the data
  if (!isAdmin || !hasDeleteAccess) {
    res.status(401).json({
      message: 'This user is not an admin',
    });
    return;
  }

  destroyData();

  res.status(200).json({ status: 'ok' });
};

module.exports = {
  getAllData,
  deleteAllData,
};
