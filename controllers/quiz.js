const Users = require('../models/User');

// @desc    Store the number of times that the user had to retry the quiz
// @route   POST /api/quiz/retries
// @access  private
const saveQuizRetries = async (req, res) => {
  const { retries } = req.body;
  const { id, createdAt } = req.user;

  try {
    await Users.updateUserAssignment(id, createdAt, { retries });
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      message: 'An error occured trying to save the quiz data.',
    });
  }
};

module.exports = {
  saveQuizRetries,
};
