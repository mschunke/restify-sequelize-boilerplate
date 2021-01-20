const UserDao = require('../database/dao/users')
const { APIError } = require('./apiError');

async function validEmail(req, res, next) {
  const { email } = req.body;
  
  const validFormat = email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
  if (!validFormat) {
    APIError(res, 'INVALID_EMAIL_FORMAT', 'The e-mail entered is not valid')
    return
  }

  const emailExist = UserDao.findUser({ email })
  if (emailExist) {
    APIError(res, 'DUPLICATE_EMAIL', 'The e-mail entered is already in use')
    return
  }

  next()
}

module.exports = {
  validEmail
}