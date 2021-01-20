const { User } = require('../models')

async function createUser(newUser) {
  return await User.create(newUser)
}

async function findUser(query, opts = {}) {
  return await User.findOne({ where: query, ...opts })
}

async function findUsers(query, opts = {}) {
  return await User.findAll({ where: query,  ...opts })
}

module.exports = {
  createUser,
  findUser,
  findUsers,
}