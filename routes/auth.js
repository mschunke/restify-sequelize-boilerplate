const AuthCtrl = require('../controllers/auth')

module.exports = function (mainRoute, server) {
  server.post(`${mainRoute}/login`, AuthCtrl.login)
  server.post(`${mainRoute}/logout`, AuthCtrl.logout)
  server.post(`${mainRoute}/refresh`, AuthCtrl.refresh)
}