const { CronJob } = require('cron');
const { getBuyPrice, getSellPrice } = require('../services/coinbase');
const { getDb } = require('../services/database');

const watchedCurrencies = ['BTC-EUR', 'LTC-EUR', 'ETH-EUR' ];

const priceFormater = (response, time, type) => ({
  ...response.data.data,
  time,
  type,
});

const coinbaseListerner = () => {
  new CronJob({
    cronTime: '*/15 * * * * *',
    onTick: () => {
      const time = new Date();
      watchedCurrencies.map(currency => (
        Promise.all([
          getBuyPrice(currency),
          getSellPrice(currency),
        ]).then(([buyPrice, sellPrice]) => {
          const formattedBuy = priceFormater(buyPrice, time, 'buy');
          const formattedSell = priceFormater(sellPrice, time, 'sell');

          getDb()
            .collection('prices')
            .insertMany([formattedBuy, formattedSell])
            .catch((error) => console.error(error));

        }).catch(errors => console.error(errors))
      ));
    },
    start: true,
  });
};

module.exports = coinbaseListerner;
