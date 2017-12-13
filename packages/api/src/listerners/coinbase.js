const { getPrices } = require('../clients/coinbase');
const { CronJob } = require('cron');

const coinbaseListerner = () => {
  new CronJob({
    cronTime: '*/15 * * * * *',
    onTick: () => {
      const time = new Date();
      getPrices('BTC-EUR', 'LTC-EUR', 'ETH-EUR')
        .then(({ buy, sell }) => {
          console.log(time.toISOString())
          console.log(
            'buy',
            buy['BTC-EUR'].data.data,
            buy['LTC-EUR'].data.data,
            buy['ETH-EUR'].data.data,
          );
          console.log(
            'sell',
            sell['BTC-EUR'].data.data,
            sell['LTC-EUR'].data.data,
            sell['ETH-EUR'].data.data,
          );
        })
        .catch(error => console.error(error));
    },
    start: true,
  });

};

module.exports = coinbaseListerner;
