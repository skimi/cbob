const axios = require('axios');

axios.defaults.headers.common['CB-VERSION'] = '2017-12-12';

const getBuyPrice = (currency_pair) => (
  axios.get(`https://api.coinbase.com/v2/prices/${currency_pair}/buy`)
);

const getSellPrice = (currency_pair) => (
  axios.get(`https://api.coinbase.com/v2/prices/${currency_pair}/sell`)
);

module.exports = {
  getBuyPrice,
  getSellPrice,
};
