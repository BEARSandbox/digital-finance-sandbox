const jwt = require('jsonwebtoken');
const Users = require('../models/User');

const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    console.log('Authorization header not found');
    return res.status(401).json({
      message: 'Not authorized.',
    });
  }

  if (!req.headers.authorization.startsWith('Bearer')) {
    console.log('Authorization header does not start with Bearer');
    return res.status(401).json({
      message: 'Not authorized.',
    });
  }

  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      console.log('Invalid access token');
      return res.status(401).json({
        message: 'Not authorized.',
      });
    }

    try {
      const found = await Users.findUserAssignment(user.id, user.createdAt);
      if (!found) {
        console.log('User does not exist in database');
        return res.status(401).json({
          message: 'Not authorized.',
        });
      }

      req.user = found;
      next();
    } catch (error) {
      console.log(error.message);
      return res.status(401).json({
        message: 'Not authorized.',
      });
    }
  });
};

module.exports = {
  protect,
};
