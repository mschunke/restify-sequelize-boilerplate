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

async function findAndCountUsers(limit = 10, offset = 0, query = {}, opts = {}) {
  return await User.findAndCountAll({ limit, offset, where: { ...query }, ...opts})
}

async function updateUser(query, updUser) {
  return await User.update(updUser, { where: query })
}

async function deleteUser(query) {
  return await User.destroy({ where: query })
}

module.exports = {
  createUser,
  findUser,
  findUsers,
  findAndCountUsers,
  updateUser,
  deleteUser,
}