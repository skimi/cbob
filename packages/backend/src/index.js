const { join } = require('path');
const { readdirSync } = require('fs');
const { connect } = require('./services/database');
const server = require('./services/server');

readdirSync(join(__dirname, 'routes')).forEach((file) => {
  require(`./routes/${file}`);
});

const start = async () => {
  try {
    await connect();
    await server.start();
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

start();
