const { Sequelize } = require('sequelize');
const { models } = require('./models/index');

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false
})
models(sequelize)

async function connect() {
  try {
    await sequelize.authenticate()
    console.log("Connected to database")
    return sequelize
  } catch (error) {
    console.log(error.message)
    return null
  }
}

module.exports = {
  connect,
  db: sequelize
}