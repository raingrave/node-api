const Movie = require('../models/Movie.js')

const Boom = require('boom')

module.exports.getAll = () => {
	return Movie.findAll({
		order: [['id', 'ASC']]
	})
}

module.exports.findById =  (id) => {
	return Movie.findByPk(id)
		.then(movie => {
			if (movie) {
				return movie
			}
			
			throw Boom.notFound('missing').output
		})
}

module.exports.create = (movie) => {
	return Movie.create(movie)
		.then(movie => {
			if (movie.id) {
				return movie
			}

			throw Boom.badRequest('not created').output
		})
}

module.exports.update = (id, data) => {

	if (data.password) {
		data.password = bcrypt.hashSync(data.password, 8)
	}

	return Movie.update(data, { where: { id: id }})
		.then(movie => {
			if (movie[0]) {
				return true
			}

			throw Boom.badRequest('not updated').output
		})
}

module.exports.delete = (id) => {
	return Movie.destroy({ where: { id: id } })
		.then(deleted => {
			if (deleted) {
				return true
			}

			throw Boom.badRequest('not deleted').output
		})
}