const { MongoClient } = require('mongodb');
const assert = require('assert');

const url = 'mongodb://mongo:27017';
const dbName = 'cbob';

let db;
let client;

const connect = () => (
  new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, client) {
      if (err) {
        return reject(err);
      }

      db = client.db(dbName);
      client = client;

      resolve();
    });
  })
);

module.exports = {
  connect,
  getDb: () => db,
  getClient: () => client,
  SORT: {
    ASCENDING: 1,
    DESCENDING: -1,
  }
};
