const server = require('../services/server');

server.route({
  method: 'GET',
  path: '/hello',
  handler: function (request, h) {
    return 'hello world';
  }
});
