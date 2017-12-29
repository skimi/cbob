const axios = require('axios');
const config = require('config');
const { Client } = require('coinbase');

const client = new Client({
  apiKey: config.coinbase.apiKey,
  apiSecret: config.coinbase.apiSecret,
});

axios.defaults.headers.common['CB-VERSION'] = '2017-12-12';

const getBuyPrice = (currency_pair) => (
  axios.get(`https://api.coinbase.com/v2/prices/${currency_pair}/buy`)
);

const getSellPrice = (currency_pair) => (
  axios.get(`https://api.coinbase.com/v2/prices/${currency_pair}/sell`)
);

const getAccounts = () => (
  new Promise((resolve, reject) => {
    client.getAccounts({}, function(err, accounts) {
      if (err) {
        reject(err);
      }
      resolve(accounts);
    });
  })
);

module.exports = {
  getBuyPrice,
  getSellPrice,
  getAccounts,
};
