const bcrypt = require('bcrypt')

const UsersDao = require('../database/dao/users')
const { APIError } = require('../middleware/apiError');

async function createUser(req, res) {
  const { firstName, lastName, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = {
      firstName,
      lastName,
      email,
      password: passwordHash
    }

    const createdUser = await UsersDao.createUser(newUser)
    res.send({
      success: true,
      data: createdUser,
    })
  } catch (error) {
    APIError(res, 'USER_CREATE_ERROR', error.message)
  }
}

async function getUser(req, res) {
  try {
    const { email, userId } = req.query;

    const query = {
      email,
      id: userId,
    }
    console.log(query)
    Object.keys(query).forEach(k => query[k] === undefined && delete query[k])
    console.log(query)
    const data = await UsersDao.findUser(query, { attributes: ['id', 'email', 'firstName', 'lastName'] })

    res.send({
      success: true,
      data
    })
  } catch (error) {
    APIError(res, 'USER_FIND_ERROR', error.message)
  }
}

module.exports = {
  createUser,
  getUser,
}