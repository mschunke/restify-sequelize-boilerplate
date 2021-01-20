const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      field: 'id',
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'email',
      field: 'str_email'
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'str_first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'str_last_name',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'str_password',
    }
  }, {
    tableName: 'users',
  })
}