const bcrypt = require('bcrypt')

const { generateUuid, checkUuid } = require('../helpers/uuid');
const UsersDao = require('../database/dao/users')
const { APIError } = require('../middleware/apiError');

async function createUser(req, res) {
  const { firstName, lastName, email, password, uuid } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const uuidStr = generateUuid(email)
    const newUser = {
      firstName,
      lastName,
      email,
      uuid: uuidStr,
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
    Object.keys(query).forEach(k => query[k] === undefined && delete query[k])
    const data = await UsersDao.findUser(query, { attributes: ['id', 'email', 'firstName', 'lastName'] })

    res.send({
      success: true,
      data
    })
  } catch (error) {
    APIError(res, 'USER_FIND_ERROR', error.message)
  }
}

async function getUsers(req, res) {
  try {
    const { query } = req.query;

    const data = await UsersDao.findUsers(query || {}, { attributes: ['id', 'email', 'firstName', 'lastName'] })

    res.send({
      success: true,
      data
    })
  } catch (error) {
    APIError(res, 'USER_FIND_ERROR', error.message)
  }
}

async function getAndCountUsers(req, res) {
  try {
    const { query, limit, offset } = req.query;

    const queryJSON = query ? JSON.query(query) : {}
    const queryObj = queryJSON
    const data = await UsersDao.findAndCountUsers(limit, offset, queryObj, { attributes: ['id', 'email', 'firstName', 'lastName'] })

    res.send({
      success: true,
      data
    })
  } catch (error) {
    APIError(res, 'USER_FIND_ERROR', error.message)
  }
}

async function updateUser(req, res) {
  try {
    const { userId, updUser } = req.body;

    const data = await UsersDao.updateUser({ id: userId }, updUser)

    res.send({
      success: true,
      data
    })
  } catch (error) {
    APIError(res, 'USER_UPDATE_ERROR', error.message)
  }
}

async function deleteUser(req, res) {
  try {
    const { userId } = req.body;

    const data = await UsersDao.deleteUser({ id: userId })

    res.send({
      success: true,
      data
    })
  } catch (error) {
    APIError(res, 'USER_DELETE_ERROR', error.message)
  }
}

module.exports = {
  createUser,
  getUser,
  getUsers,
  getAndCountUsers,
  updateUser,
  deleteUser,
}