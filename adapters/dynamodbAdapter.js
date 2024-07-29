const AWS = require('aws-sdk');
let dynamodb, docClient;

const setup = () => {
  const awsConfig = {
    region: process.env.AWS_REGION,
    accessKeyId:
      process.env.NODE_ENV === 'development'
        ? process.env.AWS_ACCESS_KEY_DEV
        : process.env.AWS_ACCESS_KEY,
    secretAccessKey:
      process.env.NODE_ENV === 'development'
        ? process.env.AWS_SECRET_ACCESS_KEY_DEV
        : process.env.AWS_SECRET_ACCESS_KEY,
  };

  if (process.env.NODE_ENV === 'development') {
    awsConfig.endpoint = `http://localhost:${process.env.DYNAMODB_PORT_DEV}`;
  }

  AWS.config.update(awsConfig);

  dynamodb = new AWS.DynamoDB();
  docClient = new AWS.DynamoDB.DocumentClient();
};

const Database = (config) => {
  const createTable = async (partitionKey, sortKey) => {
    try {
      var params = {
        TableName: config.tablename,
        KeySchema: [
          { AttributeName: partitionKey.name, KeyType: 'HASH' },
          { AttributeName: sortKey.name, KeyType: 'RANGE' },
        ],
        AttributeDefinitions: [
          {
            AttributeName: partitionKey.name,
            AttributeType: partitionKey.type,
          },
          {
            AttributeName: sortKey.name,
            AttributeType: sortKey.type,
          },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      };

      const data = await dynamodb.createTable(params).promise();
      console.log(
        'Created table. Table description JSON:',
        JSON.stringify(data, null, 2)
      );
    } catch (err) {
      console.error(
        'Unable to create table. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      throw new Error('Create Table failed');
    }
  };

  const deleteTable = async () => {
    try {
      var params = {
        TableName: config.tablename,
      };

      const data = await dynamodb.deleteTable(params).promise();
      console.log(
        'Deleted table. Table description JSON:',
        JSON.stringify(data, null, 2)
      );
    } catch (err) {
      console.error(
        'Unable to delete table. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      throw new Error('Delete Table failed');
    }
  };

  const create = async (data) => {
    try {
      var params = {
        TableName: config.tablename,
        Item: data,
      };

      const result = await docClient.put(params).promise();
      console.log('Added item:', JSON.stringify(result));
    } catch (error) {
      console.error(
        'Unable to add item. Error:',
        JSON.stringify(error, null, 2)
      );
      throw new Error('Create failed');
    }
  };

  const read = async (key) => {
    try {
      var params = {
        TableName: config.tablename,
        Key: key,
      };

      const result = await docClient.get(params).promise();
      console.log('Got item:', JSON.stringify(result));

      // If there are no rows, return false
      return result.Item || false;
    } catch (error) {
      console.error(
        'Unable to read item. Error:',
        JSON.stringify(error, null, 2)
      );
      throw new Error('Read failed');
    }
  };

  const query = async (conditions, reverse = false, index = null) => {
    const conditionsStr = conditions
      .map((condition) => {
        const name = condition[0];
        const equality = condition[1];
        return `${name} ${equality} :${name}`;
      })
      .join(' and ');

    const valuesJson = conditions.reduce(function (obj, condition) {
      const name = condition[0];
      const value = condition[2];
      obj[`:${name}`] = value;
      return obj;
    }, {});

    try {
      var params = {
        TableName: config.tablename,
        ScanIndexForward: !reverse,
        KeyConditionExpression: conditionsStr,
        ExpressionAttributeValues: valuesJson,
      };

      if (index) {
        params[IndexName] = index;
      }

      const result = await docClient.query(params).promise();
      console.log('Got item:', JSON.stringify(result));
      return result.Items;
    } catch (error) {
      console.error(
        'Unable to query item. Error:',
        JSON.stringify(error, null, 2)
      );
      throw new Error('Query failed');
    }
  };

  const update = async (key, data) => {
    try {
      let updateExprStr = 'set ';

      updateExprStr += Object.keys(data)
        .map((objKey) => `#${objKey} = :${objKey}`)
        .join(', ');

      const namesJson = Object.keys(data).reduce(function (obj, attribute) {
        obj[`#${attribute}`] = attribute;
        return obj;
      }, {});

      const valuesJson = Object.keys(data).reduce(function (obj, attribute) {
        obj[`:${attribute}`] = data[attribute];
        return obj;
      }, {});

      var params = {
        TableName: config.tablename,
        Key: key,
        UpdateExpression: updateExprStr,
        ExpressionAttributeNames: namesJson,
        ExpressionAttributeValues: valuesJson,
      };

      const result = await docClient.update(params).promise();
      console.log('Updated item:', JSON.stringify(result));
    } catch (error) {
      console.error(
        'Unable to update item. Error:',
        JSON.stringify(error, null, 2)
      );
      throw new Error('Update failed');
    }
  };

  const scan = async (attributes = null) => {
    try {
      var params = { TableName: config.tablename };

      // Only get certain attributes
      if (attributes != null) {
        const namesJson = attributes.reduce(function (obj, attribute) {
          obj[`#${attribute}`] = attribute;
          return obj;
        }, {});

        const attributesStr = attributes
          .map((attribute) => `#${attribute}`)
          .join(', ');

        params['ProjectionExpression'] = attributesStr;
        params['ExpressionAttributeNames'] = namesJson;
      }

      const scanResults = [];
      let lastEvaluatedKey;
      // One scan might not be enough to scan the whole table
      do {
        const items = await docClient.scan(params).promise();
        lastEvaluatedKey = items.LastEvaluatedKey;

        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
      } while (typeof lastEvaluatedKey !== 'undefined');

      return scanResults;
    } catch (error) {
      console.error(
        'Unable to scan items. Error:',
        JSON.stringify(error, null, 2)
      );
      throw new Error('Scan failed');
    }
  };

  const remove = async (key) => {
    try {
      var params = {
        TableName: config.tablename,
        Key: key,
      };

      const result = await docClient.delete(params).promise();
      console.log('Deleted item:', JSON.stringify(result));
    } catch (error) {
      console.error(
        'Unable to delete item. Error:',
        JSON.stringify(error, null, 2)
      );
      throw new Error('Delete failed');
    }
  };

  const batchRemove = async (items) => {
    try {
      const deleteRequests = items.map((item) => ({
        DeleteRequest: {
          Key: item,
        },
      }));

      var params = {
        RequestItems: {
          [config.tablename]: deleteRequests,
        },
      };

      const result = await docClient.batchWrite(params).promise();
      console.log('Batch write:', JSON.stringify(result));
    } catch (error) {
      console.error(
        'Unable to complete batch request. Error:',
        JSON.stringify(error, null, 2)
      );
      throw new Error('Batch Write failed');
    }
  };

  /**
   * Complete each of the transactions as one atomic operation
   */
  const transactWrite = async (transactions) => {
    try {
      const writeRequests = transactions.map((transaction) => ({
        [transaction[0]]: {
          TableName: transaction[1].tablename,
          Item: transaction[1].data,
        },
      }));

      var params = {
        TransactItems: writeRequests,
      };

      const result = await docClient.transactWrite(params).promise();
      console.log('Completed transact write:', JSON.stringify(result));
    } catch (error) {
      console.error(
        'Unable to complete transact write. Error:',
        JSON.stringify(error, null, 2)
      );
      throw new Error('Transact write failed');
    }
  };

  return {
    createTable,
    deleteTable,
    create,
    read,
    query,
    update,
    scan,
    remove,
    batchRemove,
    transactWrite,
  };
};

module.exports = { setup, Database };
