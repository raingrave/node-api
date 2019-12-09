const bcrypt = require('bcrypt')
const Customer = require('../models/Customer.js')
const jwtService = require('./jwtService')

const check = (email, password) => {
	return Customer.findOne({
		where: {
			email: email
		}
	}).then(async user => {
		if (user.email === email && await bcrypt.compare(password, user.password)) {
			return user	
		}

		const Boom = require('boom')

		throw Boom.badRequest('invalid credentials')
	})
}

module.exports.authenticate = (credentials) => {
	return check(credentials.email, credentials.password)
		.then(payload => jwtService.generateToken(payload))
}