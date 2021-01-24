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
    uuid: {
      type: DataTypes.STRING,
      unique: true,
      field: 'str_uuid',
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    indexes: [
      {
        name: 'uniq_email',
        fields: ['str_email'],
        unique: true,
      }, {
        name: 'uniq_uuid',
        fields: ['str_uuid'],
        unique: true,
      }
    ]
  })
}