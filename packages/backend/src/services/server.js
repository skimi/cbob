const Hapi = require('hapi');

const server = Hapi.server({
  host: '0.0.0.0',
  port: 8000,
  routes: {
    cors: true
  }
});

module.exports = server;
