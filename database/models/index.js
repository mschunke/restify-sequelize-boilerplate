const UserModel = require('./users')

async function models(sequelize) {
  const User = UserModel(sequelize)

  await sequelize.sync({ alter: true })

  return {
    User,
  }
}

module.exports = {
  models,
}