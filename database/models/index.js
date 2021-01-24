const UserModel = require('./users')

async function models(sequelize) {
  const User = UserModel(sequelize)

  // await sequelize.sync({ force: true }) // USE WITH CAUTION!

  return {
    User,
  }
}

module.exports = {
  models,
}