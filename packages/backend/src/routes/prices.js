const Joi = require('joi');
const { isNil, omitBy, last, first } = require('lodash');
const { getDb, SORT } = require('../services/database');
const server = require('../services/server');

const validation = {
  base: Joi.string().valid(['BTC', 'LTC', 'ETH']).required(),
  currency: Joi.string().valid(['EUR']).default('EUR'),
  type: Joi.string().valid(['sell', 'buy']),
  start: Joi.date().required(),
  end: Joi.date(),
};

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
      query: validation
    }
  }
});

server.route({
  method: 'GET',
  path: '/prices/hour',
  handler: (request) => {
    const { base, currency, type } = request.query;
    const startDate = new Date(request.query.start);
    const endDate = request.query.end ? new Date(request.query.end) : new Date();

    return new Promise((resolve, reject) => {
      getDb()
        .collection('prices')
        .aggregate([
          {
            $match: omitBy({
              base,
              currency,
              type,
              time: {
                $gte: startDate,
                $lte: endDate,
              }
            }, isNil)
          },
          {
            $group: {
              '_id': {
                y: { $year: '$time' },
                m: { $month: '$time' },
                d: { $dayOfMonth: '$time' },
                h: { $hour: '$time' },
              },
              groups: { $push: '$$ROOT' }
            }
          },
          { $sort: {
            '_id.y': SORT.ASCENDING,
            '_id.m': SORT.ASCENDING,
            '_id.d': SORT.ASCENDING,
            '_id.h': SORT.ASCENDING,
          } },
        ])
        .toArray((err, hourlyPrices) => {
          if (err) reject(err);
          resolve(hourlyPrices.map(({ _id, groups }) => {
            return {
              time: new Date(_id.y, _id.m - 1, _id.d, _id.h),
              open: first(groups),
              close: last(groups),
              lowest: groups.reduce((acc, price) => {
                if (!acc) return price;
                if (parseFloat(price.amount) < parseFloat(acc.amount)) return price;
                return acc;
              }),
              highest: groups.reduce((acc, price) => {
                if (!acc) return price;
                if (parseFloat(price.amount) > parseFloat(acc.amount)) return price;
                return acc;
              })
            }
          }));
        });
    })
  },
  config: {
    validate: {
      query: validation
    }
  }
});
