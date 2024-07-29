const fs = require('fs');
const { generateToken } = require('../utils/auth');
const Users = require('../models/User');

// @desc    Fetch all users
// @route   GET /api/users
// @access  Private
const getUsers = async (req, res) => {
  const users = await Users.getAllUserAssignments(['id', 'createdAt']);
  res.status(200).json(users);
};

// @desc    Authenticate user and get token
// @route   POST /api/users/login
const authAdmin = async (req, res) => {
  const { email: id, password: email } = req.body;

  try {
    const user = await Users.findLastUserAssignmentForId(id);
    if (!user) {
      res.status(401).json({
        message: 'This user does not exist or is not an admin',
      });
      return;
    }

    // user with the provided email has been found
    // check if provided password is valid
    if (!user.isAdmin) {
      res.status(401).json({
        message: 'This user does not exist or is not an admin',
      });
      return;
    }

    const passwordMatch = email == user.email;
    if (!passwordMatch) {
      res.status(401).json({
        message: 'Password is invalid',
      });
      return;
    }

    res.status(201).json({
      user: {
        id: user.id,
        createdAt: user.createdAt,
        isAdmin: user.isAdmin,
        hasConsented: user.hasConsented,
        hasDeleteAccess: user.hasDeleteAccess,
        factorOne: user.factorOne,
        factorTwo: user.factorTwo,
        factorThree: user.factorThree,
        email: user.email,
        token: generateToken(user.id, user.createdAt),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      message: 'User with the provided id not found',
    });
  }
};

/* 
@desc    Generate a new user with uniformly random choices for the
         experiment parameters but also make sure it is even at the end.
         To accomplish this, we pick uniformly random from the 4 conditions
         without replacement, and then replenish the list once it's exhausted
@route   POST /api/users/generate-user
*/
const generateUser = async (req, res) => {
  const {
    assignmentId = '',
    workerId = '',
    isRA = false,
    clientData = {},
  } = req.body;

  if (workerId === '') {
    console.error('workerId is required');
    res.status(400).json({
      message: 'An error occured trying to create the user.',
    });
    return;
  }

  const { os = '', browser = '', platform = '' } = clientData;

  /**
   * Get file that stores the conditions available to use.
   * If empty or file doesn't exist, add all the different
   * conditions available.
   **/
  const path = '../conditionsAvailable.txt';
  const allConditions = [...Array(4).keys()];
  let oldConditionsAvailable = [...allConditions];
  let userInsertedIntoDB = false;

  try {
    // Check if workerId already exists
    const response = await Users.findLastUserAssignmentForId(workerId);
    let userData;

    if (response) {
      userData = response;
    } else {
      let conditionsAvailable;
      if (!fs.existsSync(path)) {
        // File doesn't exists so create an empty file
        fs.writeFileSync(path, '');
        conditionsAvailable = allConditions;
      } else {
        conditionsAvailable = fs
          .readFileSync(path, 'utf8')
          .split(' ')
          .map((digit) => parseInt(digit));
      }

      oldConditionsAvailable = [...conditionsAvailable];

      const index = Math.floor(Math.random() * conditionsAvailable.length);
      const conditionChosen = conditionsAvailable[index];

      // Remove condition from available options
      conditionsAvailable.splice(index, 1);

      // Replenish if empty
      if (conditionsAvailable.length == 0) {
        conditionsAvailable = allConditions;
      }

      const dataToWrite = conditionsAvailable.join(' ');
      fs.writeFileSync(path, dataToWrite);

      const factorOne = Math.floor(conditionChosen / 2);
      const factorThree = conditionChosen % 2;

      const epochTime = Date.now();
      userData = {
        id: workerId,
        assignmentId: assignmentId,
        createdAt: epochTime,
        isAdmin: false,
        hasDeleteAccess: false,
        factorOne: factorOne, // random number: 0 or 1
        factorTwo: 2, // This factor is no longer used so it is set to 2 (instead of 0 or 1)
        factorThree: factorThree,
        os: os,
        browser: browser,
        device: platform,
        isRA: isRA,
      };

      await Users.addUserAssignment(userData);
    }

    userInsertedIntoDB = true;

    res.status(201).json({
      user: {
        id: userData.id,
        isAdmin: userData.isAdmin,
        hasConsented: userData.hasConsented || false,
        hasDeleteAccess: false,
        factorOne: userData.factorOne,
        factorTwo: userData.factorTwo,
        factorThree: userData.factorThree,
        createdAt: userData.createdAt,
        applicationSubmitted: userData.applicationSubmitted || false,
        sessionReviewSubmitted: userData.sessionReviewSubmitted || false,
        surveyCode: userData.surveyCode || '',
        token: generateToken(userData.id, userData.createdAt),
      },
    });
  } catch (error) {
    // Reset the conditions if the user was not added to the DB yet
    if (!userInsertedIntoDB) {
      const dataToWrite = oldConditionsAvailable.join(' ');
      fs.writeFileSync(path, dataToWrite);
    }

    console.error(error.message);
    res.status(400).json({
      message: 'An error occured trying to create the user.',
    });
  }
};

/* 
@desc    Record that the user gave consent to do the experiment
@route   POST /api/users/consent
@access  private
*/
const consent = async (req, res) => {
  const { id, createdAt } = req.user;

  try {
    await Users.updateUserAssignment(id, createdAt, { hasConsented: true });
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      message: 'An error occured trying to save the user consent.',
    });
  }
};

module.exports = {
  getUsers,
  authAdmin,
  generateUser,
  consent,
};
