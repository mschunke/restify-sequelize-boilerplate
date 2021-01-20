async function APIError(res, errorCode, errorMessage = 'Unknown error') {
  res.send({
    success: false,
    errorCode,
    errorMessage
  })
  return
}

module.exports = {
  APIError
}

/*
  ERROR SYNTAX
  =======================
  AAAA_XXXX
  AAAA = Object (login, db read, call)
  XXXX = Status (FAILED, MISSING, NOT_FOUND)

*/