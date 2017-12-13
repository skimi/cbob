const axios = require('axios');

axios.defaults.headers.common['CB-VERSION'] = '2017-12-12';

const getBuyPrice = (...currency_pairs) => (
  axios.all(
    currency_pairs.map(currency_pair => (
      axios.get(`https://api.coinbase.com/v2/prices/${currency_pair}/buy`)
    ))
  ).then(axios.spread((...responses) => (
    responses.reduce((carry, response, index) => ({
      [currency_pairs[index]]: response,
      ...carry,
    }), {})
  )))
);

const getSellPrice = (...currency_pairs) => (
  axios.all(
    currency_pairs.map(currency_pair => (
      axios.get(`https://api.coinbase.com/v2/prices/${currency_pair}/sell`)
    ))
  ).then(axios.spread((...responses) => (
    responses.reduce((carry, response, index) => ({
      [currency_pairs[index]]: response,
      ...carry,
    }), {})
  )))
);

const getPrices = (...currency_pairs) => {
  return Promise.all([
    getBuyPrice.apply(null, currency_pairs),
    getSellPrice.apply(null, currency_pairs),
  ]).then(([buyPrices, sellPrices]) => ({
    buy: buyPrices,
    sell: sellPrices
  }))
};

module.exports = {
  getBuyPrice,
  getSellPrice,
  getPrices,
};
