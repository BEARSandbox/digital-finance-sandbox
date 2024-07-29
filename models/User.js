const validateSchema = require('../utils/schemaValidator');
const { Database } = require('../config/db');

const TABLE_NAME = 'Users';
const db = Database({
  tablename: TABLE_NAME,
});

const userSchema = {
  id: {
    type: 'string',
    required: true,
  },
  assignmentId: {
    type: 'string',
    required: true,
  },
  createdAt: {
    type: 'number',
    required: true,
  },
  isAdmin: {
    type: 'boolean',
    required: true,
  },
  factorOne: {
    type: 'number',
    required: true,
  },
  factorTwo: {
    type: 'number',
    required: true,
  },
  factorThree: {
    type: 'number',
    required: true,
  },
  os: {
    type: 'string',
    required: true,
  },
  browser: {
    type: 'string',
    required: true,
  },
  device: {
    type: 'string',
    required: true,
  },
};

const create = async () => {
  await db.createTable(
    { name: 'id', type: 'S' },
    { name: 'createdAt', type: 'N' }
  );
};

const destroy = async () => {
  await db.deleteTable();
};

const addUserAssignment = async (userData) => {
  validateSchema(userSchema, userData);
  await db.create(userData);
};

const findUserAssignment = async (id, createdAt) => {
  const assignments = await db.query([
    ['id', '=', id],
    ['createdAt', '=', createdAt],
  ]);
  return assignments[0] || false;
};

const findLastUserAssignmentForId = async (id) => {
  // Reverse chronological order
  const assignments = await db.query([['id', '=', id]], true);
  return assignments[0] || false;
};

const updateUserAssignment = async (id, createdAt, newData) => {
  await db.update({ id, createdAt }, newData);
};

const getAllUserAssignments = async (attributes) => {
  const users = await db.scan(attributes);
  return users;
};

const removeUserAssignments = async (users) => {
  await db.batchRemove(users);
};

module.exports = {
  TABLE_NAME,
  create,
  destroy,
  addUserAssignment,
  findUserAssignment,
  findLastUserAssignmentForId,
  updateUserAssignment,
  getAllUserAssignments,
  removeUserAssignments,
};
