const validateSchema = require('../utils/schemaValidator');
const { Database } = require('../config/db');

const TABLE_NAME = 'Actions';
const db = Database({
  tablename: TABLE_NAME,
});

const actionSchema = {
  id: {
    type: 'string',
    required: true,
  },
  time: {
    type: 'number',
    required: true,
  },
  type: {
    type: 'string',
    required: true,
  },
  clickedOn: {
    type: 'string',
    required: false,
  },
  position: {
    type: 'number',
    required: false,
  },
  webpage: {
    type: 'string',
    required: true,
  },
  metadata: {
    type: 'object',
    required: false,
  },
};

const create = async () => {
  await db.createTable({ name: 'id', type: 'S' }, { name: 'time', type: 'N' });
};

const destroy = async () => {
  await db.deleteTable();
};

const addAction = async (action) => {
  validateSchema(actionSchema, action);
  await db.create(action);
};

const getAllActions = async (attributes) => {
  const actions = await db.scan(attributes);
  return actions;
};

const removeActions = async (actions) => {
  await db.batchRemove(actions);
};

module.exports = {
  TABLE_NAME,
  create,
  destroy,
  addAction,
  getAllActions,
  removeActions,
};
