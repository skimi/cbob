const coinbaseListerner = require('./coinbase');
const { connect } = require('../services/database');

connect().then(() => {
  coinbaseListerner();
});
