const bcrypt = require('bcrypt')
const Customer = require('../models/Customer.js')
const Boom = require('boom')
const jwtService = require('../services/jwtService')

const check = async (email, password) => {
	const customer = await Customer.findOne({ where: { email: email }})
	
	if (customer.email == email && await bcrypt.compare(password, customer.password)) {
		return await customer.id	
	}

	throw Boom.badRequest('invalid credentials').output
}

module.exports.authenticate = async (credentials) => {
	 const payload = await check(credentials.email, credentials.password)

	 return await jwtService.generateToken(payload)
}

module.exports.logout = () => {
	return {
		auth: false,
		token: null
	};
}