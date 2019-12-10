const bcrypt = require('bcrypt')
const Customer = require('../models/Customer.js')
const Boom = require('boom')
const jwtService = require('../services/jwtService')

const check = (email, password) => {
	return Customer.findOne({ where: { email: email }})
		.then(async customer => {
			if (customer.email == email && await bcrypt.compare(password, customer.password)) {
				return true	
			}

			throw Boom.badRequest('invalid credentials').output
		})
}

module.exports.authenticate = (credentials) => {
	return check(credentials.email, credentials.password)
		.then(payload => jwtService.generateToken(payload))
}