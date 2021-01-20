const UserCtrl = require('../controllers/users')
const UserValidations = require('../middleware/userValidations');

module.exports = function (mainRoute, server) {
  server.post(`${mainRoute}/create/`, [
    UserValidations.validEmail
  ], UserCtrl.createUser)
  server.get(`${mainRoute}/get`, UserCtrl.getUser)
}