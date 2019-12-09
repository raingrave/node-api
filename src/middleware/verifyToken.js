const error = require('boom')
const authService = require('../services/jwtService')

module.exports = function (request, response, next) {
    if (authService.tokenVerify(request.headers.authorization)) {
        return response.json(error.unauthorized('invalid password').output.payload)
    }

    next()
}