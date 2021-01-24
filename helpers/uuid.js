const { v5: uuidv5, validate: uuidValidate} = require('uuid')

const nsUuid = process.env.NAMESPACE_UUID

function generateUuid(value) {
  return uuidv5(value, nsUuid)
}

function checkUuid(uuidString) {
  return uuidValidate(uuidString)
}

module.exports = {
  generateUuid,
  checkUuid,
}