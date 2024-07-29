const Users = require('../models/User');

// @desc    Store form data to the database
// @route   POST /api/form/form-data
// @access  private
const saveFormData = async (req, res) => {
  const { formData } = req.body;
  const { id, createdAt } = req.user;

  try {
    await Users.updateUserAssignment(id, createdAt, formData);
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      message: 'An error occured trying to submit the form.',
    });
  }
};

// @desc    Store the survey code to the database for verification
// @route   POST /api/form/survey-code
// @access  private
const saveSurveyCode = async (req, res) => {
  const { surveyCode } = req.body;
  const { id, createdAt } = req.user;

  try {
    await Users.updateUserAssignment(id, createdAt, { surveyCode });
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      message: 'An error occured trying to save the survey code.',
    });
  }
};

module.exports = {
  saveFormData,
  saveSurveyCode,
};
