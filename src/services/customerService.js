const Customer = require('../models/Customer.js')

const bcrypt = require('bcrypt')

const Boom = require('boom')

module.exports.getAll = () => {
	return Customer.findAll({
		order: [['id', 'ASC']]
	})
}

module.exports.findById =  (id) => {
	return Customer.findByPk(id)
		.then(customer => {
			if (customer) {
				return customer
			}
			
			throw Boom.notFound('missing').output
		})
}

module.exports.create = (customer) => {
	customer.password = bcrypt.hashSync(customer.password, 8)

	return Customer.create(customer)
		.then(customer => {
			if (customer.id) {
				return customer
			}

			throw Boom.badRequest('not created').output
		})
}

module.exports.update = (id, data) => {

	if (data.password) {
		data.password = bcrypt.hashSync(data.password, 8)
	}

	return Customer.update(data, { where: { id: id }})
		.then(customer => {
			if (customer[0]) {
				return true
			}

			throw Boom.badRequest('not updated').output
		})
}

module.exports.delete = (id) => {
	return Customer.destroy({ where: { id: id } })
		.then(deleted => {
			if (deleted) {
				return true
			}

			throw Boom.badRequest('not deleted').output
		})
}

module.exports.rent = (id, movies) => {
	console.log(id, movies)
	return
}