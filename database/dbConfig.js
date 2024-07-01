// database/dbConfig.js
const AWS = require('aws-sdk');
const config = require('../config/config');

AWS.config.update({
  region: config.aws.region,
  endpoint: config.aws.endpoint,
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoDB;
