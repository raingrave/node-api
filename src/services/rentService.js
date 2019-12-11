const Movie = require('../models/Movie.js')

const CustomerMovie = require('../models/CustomerMovie.js')

const Boom = require('boom')

module.exports.isAvailable = async (movieId) => {
    if (await CustomerMovie.findOne({ where: { movie_id: movieId } })) {
        return false
    }

    return true
}

module.exports.rentMovie = async (customerId, movieId) => {    
    try {
        await CustomerMovie.create({
            customer_id: customerId,
            movie_id: movieId
        })

        return true
    } catch (error) {
        throw Boom.badRequest('not rent movie', error).output
    }
}

module.exports.returnMovie = async (customerId, movieId) => {    
    try {
        await CustomerMovie.destroy({ where: {
            customer_id: customerId,
            movie_id: movieId
        }})

        return true
    } catch (error) {
        throw Boom.badRequest('not return movie', error).output
    }
}

module.exports.getRentMovies = async (customerId) => {
    const movieIds = await CustomerMovie.findAll({ where: { customer_id: customerId} }).map(movie => movie.movie_id)

    const moviesRented = await Movie.findAll({ where: { id: movieIds } })

    if (moviesRented.length) {
        return moviesRented
    }

    throw Boom.notFound('movies not found')
}

