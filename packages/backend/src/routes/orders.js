const Joi = require('joi');
const mongodb = require('mongodb');
const { isNil, omitBy } = require('lodash');
const { getDb, SORT } = require('../services/database');
const server = require('../services/server');

const COLLECTION = 'orders';

server.route({
  method: 'GET',
  path: '/orders',
  handler: (request) => {
    const { base, type } = request.query;

    return new Promise((resolve, reject) => {
      getDb()
        .collection(COLLECTION)
        .find(omitBy({
          base,
          type
        }, isNil))
        .sort({ _id: SORT.DESCENDING })
        .toArray((err, orders) => {
          if (err) reject(err);
          resolve(orders);
        });
    })
  },
  config: {
    validate: {
      query: {
        base: Joi.string().valid(['BTC', 'LTC', 'ETH']),
        type: Joi.string().valid(['buy', 'sell']),
      }
    }
  }
});

server.route({
  method: 'POST',
  path: '/orders',
  handler: (request) => {
    const { base, type, subtype, amount } = request.payload;

    return new Promise((resolve, reject) => {
      getDb()
        .collection(COLLECTION)
        .insertOne({
          base,
          type,
          subtype,
          amount,
        })
        .then((result) => {
          resolve(result.ops[0]);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  config: {
    validate: {
      payload: {
        base: Joi.string().valid(['BTC', 'LTC', 'ETH']).required(),
        type: Joi.string().valid(['buy', 'sell']).required(),
        subtype: Joi.string().valid(['stoploss', 'market', 'limit']).required(),
        amount: Joi.number().required(),
      }
    }
  }
});

server.route({
  method: 'DELETE',
  path: '/orders',
  handler: (request) => {
    const { id } = request.payload;

    return new Promise((resolve, reject) => {
      getDb()
        .collection(COLLECTION)
        .deleteOne({
          _id: new mongodb.ObjectID(id),
        })
        .then((result) => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        })
    })
  },
  config: {
    validate: {
      payload: {
        id: Joi.string().alphanum().required(),
      }
    }
  }
});
