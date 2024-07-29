const PageVisits = require('../models/PageVisit');
const Actions = require('../models/Action');

// @desc    Store page data to the database
// @route   POST /api/metrics/page-data
// @access  private
const savePageData = async (req, res) => {
  const { pageData } = req.body;
  const { id: userId, createdAt } = req.user;

  let i;
  try {
    // Done sequentially for simplicity
    const key = `${userId} ${createdAt}`;

    for (i = 0; i < pageData.length; i++) {
      const pageVisit = {
        id: key,
        ...pageData[i],
      };

      await PageVisits.addPageVisit(pageVisit);
    }

    res.status(201).json({ pagesSaved: pageData.length });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      pagesSaved: i,
      message: 'An error occured trying to save some metrics.',
    });
  }
};

// @desc    Store action data to the database
// @route   POST /api/metrics/actions-data
// @access  private
const saveActionData = async (req, res) => {
  const { actionData } = req.body;
  const { id: userId, createdAt } = req.user;

  let i;
  try {
    // Done sequentially for simplicity
    const key = `${userId} ${createdAt}`;

    for (i = 0; i < actionData.length; i++) {
      const action = {
        id: key,
        ...actionData[i],
      };

      await Actions.addAction(action);
    }

    res.status(201).json({ actionsSaved: actionData.length });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      actionsSaved: i,
      message: 'An error occured trying to save some metrics.',
    });
  }
};

module.exports = {
  savePageData,
  saveActionData,
};
