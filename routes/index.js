const rjwt = require('restify-jwt-community');
const config = require('../app/config.json');
const { APIError } = require('../middleware/apiError');

const AuthRoutes = require('./auth');
const UsersRoutes = require('./users');

module.exports = function(server) {
  server.use(rjwt({
    secret: config.accessSecret,
  }).unless({
    path: ['/auth/login', '/auth/refresh', '/users/create']
  }));
  AuthRoutes('/auth', server)
  UsersRoutes('/users', server)

  server.use((err, req, res, next) => {
    if (err && err.body) { console.log(err.body)} {
      APIError(res, 'UNATHORIZED', err.body.message)
    }
    next()
  })
}
