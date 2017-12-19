const Joi = require('joi');
const { isNil, omitBy } = require('lodash');
const { getDb, SORT } = require('../services/database');
const server = require('../services/server');

server.route({
  method: 'GET',
  path: '/prices',
  handler: (request) => {
    const { base, currency, type } = request.query;
    const startDate = new Date(request.query.start);
    const endDate = request.query.end ? new Date(request.query.end) : new Date();

    return new Promise((resolve, reject) => {
      getDb()
        .collection('prices')
        .find(omitBy({
          base,
          currency,
          type,
          time: {
            $gte: startDate,
            $lte: endDate,
          }
        }, isNil))
        .sort({ time: SORT.DESCENDING })
        .toArray((err, prices) => {
          if (err) reject(err);
          resolve(prices);
        });
    })
  },
  config: {
    validate: {
      query: {
        base: Joi.string().valid(['BTC', 'LTC', 'ETH']).required(),
        currency: Joi.string().valid(['EUR']).default('EUR'),
        type: Joi.string().valid(['sell', 'buy']),
        start: Joi.date().required(),
        end: Joi.date(),
      }
    }
  }
});
