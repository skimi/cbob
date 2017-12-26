const Hapi = require('hapi');
const config = require('config');
const fs = require('fs');

const server = Hapi.server({
  host: '0.0.0.0',
  port: 8000,
  routes: {
    cors: true
  }
});

server.register(require('hapi-auth-jwt2'))
  .then(() => {
    server.auth.strategy(
      'jwt', 'jwt',
      {
        key: fs.readFileSync(config.auth.public),
        validate: async (decoded) => {
          if (config.allowedUsers.includes(decoded.username)) {
            return { valid: true };
          }
          
          return { valid: false };
        },
        verifyOptions: { algorithms: [config.auth.algorithm] }
      }
    );
  
    server.auth.default('jwt');
  })
  .catch((err) => {
    console.log(err);
  })

module.exports = server;
