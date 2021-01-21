const UserCtrl = require('../controllers/users')
const UserValidations = require('../middleware/userValidations');

module.exports = function (mainRoute, server) {
  server.get(`${mainRoute}/get`, UserCtrl.getUser)

  server.get(`${mainRoute}/getAll`, UserCtrl.getUsers)

  server.get(`${mainRoute}/getAndCount`, UserCtrl.getAndCountUsers)

  server.post(`${mainRoute}/create`, UserCtrl.createUser)

  server.patch(`${mainRoute}/update`, [
    UserValidations.validUserId
  ], UserCtrl.updateUser)

  server.del(`${mainRoute}/delete`, [
    UserValidations.validUserId
  ], UserCtrl.deleteUser)
}