const jwt = require('jsonwebtoken');

const generateToken = (id, createdAt) => {
  return jwt.sign({ id, createdAt }, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
};
