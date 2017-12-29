const { getAccounts } = require('../services/coinbase');
const server = require('../services/server');

server.route({
  method: 'GET',
  path: '/accounts',
  handler: () => (
    getAccounts()
  ),
});
