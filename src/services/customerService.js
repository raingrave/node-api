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
		.then(user => {
			if (user) {
				return user
			}
			
			throw Boom.notFound('missing').output
		})
}

module.exports.create = (user) => {

	user.password = bcrypt.hashSync(user.password, 8)

	return Customer.create(user)
		.then(user => {
			if (user.id) {
				return user
			}

			throw Boom.badRequest('not created').output
		})
}

module.exports.update = (id, data) => {
	return Customer.update(data, { where: { id: id }})
		.then(user => {
			if (user[0]) {
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