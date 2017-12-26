const config = require('config');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const username = process.argv[2];

if (!process.argv[2]) {
  throw new Error('You must pass a username as argument');
}

var token = jwt.sign(
  { username },
  fs.readFileSync(config.auth.private),
  { algorithm: config.auth.algorithm }
);

jwt.verify(token, fs.readFileSync(config.auth.public), { algorithms: [config.auth.algorithm] }, function(err, decoded) {
  if (err) {
    console.error(err);
    throw new Error('Error decoding the token. Are your certificates correct?');
  }
})

console.log(token);
