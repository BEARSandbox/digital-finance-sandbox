const validateSchema = require('../utils/schemaValidator');
const { Database } = require('../config/db');

const TABLE_NAME = 'PageVisits';
const db = Database({
  tablename: TABLE_NAME,
});

const pageVisitSchema = {
  id: {
    type: 'string',
    required: true,
  },
  start: {
    type: 'number',
    required: true,
  },
  end: {
    type: 'number',
    required: true,
  },
  webpage: {
    type: 'string',
    required: true,
  },
};

const create = async () => {
  await db.createTable({ name: 'id', type: 'S' }, { name: 'start', type: 'N' });
};

const destroy = async () => {
  await db.deleteTable();
};

const addPageVisit = async (pageVisit) => {
  validateSchema(pageVisitSchema, pageVisit);
  await db.create(pageVisit);
};

const getAllPages = async (attributes) => {
  const pages = await db.scan(attributes);
  return pages;
};

const removePages = async (pages) => {
  await db.batchRemove(pages);
};

module.exports = {
  create,
  destroy,
  TABLE_NAME,
  addPageVisit,
  getAllPages,
  removePages,
};
