const express = require('express')

const routes = express.Router()

const customerService = require('../services/customerService.js')

const movieService = require('../services/movieService')

const rentService = require('../services/rentService')

const authService = require('../services/authService.js')

const jwtService = require('../services/jwtService.js')

const verifyToken = require('../middleware/verifyToken.js')

// API
routes.get('/', (request, response) => {
	return response.send('API')
})

// List Customer
routes.get('/customers', verifyToken, async (request, response) => {
	return response.json({
		code: 200,
		data: await customerService.getAll()
	})
})

// Read Customer
routes.get('/customers/:id', verifyToken, async (request, response) => {
	try {
		return response.json({
			data: await customerService.findById(request.params.id)
		})
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Create Customer
routes.post('/customers', async (request, response) => {
	try {
		const customer = await customerService.create(request.body)

		return response.set('endpoint', `http://localhost:9090/customers/${customer.id}`)
					   .json(customer)
					   
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Update Customer
routes.put('/customers/:id', verifyToken, async (request, response) => {
	try {
		return response.set('endpoint', `http://localhost:9090/customers/${request.params.id}`)
					   .json(await customerService.update(request.params.id, request.body))
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Delete Customer
routes.delete('/customers/:id', verifyToken, async (request, response) => {
	try {
		return response.json(await customerService.delete(request.params.id))
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// List movies
routes.get('/movies', verifyToken, async (request, response) => {
	return response.json({
		code: 200,
		data: await movieService.getAll()
	})
})

// Read movie
routes.get('/movies/:id', verifyToken, async (request, response) => {
	try {
		return response.json({
			data: await movieService.findById(request.params.id)
		})
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Create movie
routes.post('/movies', async (request, response) => {
	try {
		const movie = await movieService.create(request.body)

		return response.set('endpoint', `http://localhost:9090/movies/${movie.id}`)
					   .json(movie)
					   
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Update movie
routes.put('/movies/:id', verifyToken, async (request, response) => {
	try {
		return response.set('endpoint', `http://localhost:9090/movies/${request.params.id}`)
					   .json(await movieService.update(request.params.id, request.body))
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Delete movie
routes.delete('/movies/:id', verifyToken, async (request, response) => {
	try {
		return response.json(await movieService.delete(request.params.id))
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Rent movie
routes.post('/rents', verifyToken, async (request, response) => {
	try {
		if (await rentService.isAvailable(request.body.movieId)) {
			return response.json(await rentService.rentMovie(request.body.customerId, request.body.movieId));
		}

		response.status(400).json({
			message: 'movie not avaliable'
		})
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Return movie
routes.put('/rents', verifyToken, async (request, response) => {
	try {
		return response.json(await rentService.returnMovie(request.body.customerId, request.body.movieId));
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// List rent movies
routes.get('/rents/:customerId', verifyToken, async (request, response) => {
	try {
		return response.json(await rentService.getRentMovies(request.params.customerId));
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Auth
routes.post('/authenticate', async (request, response) => {
	try {
		return response
			.status(200)
			.json({
				code: 200,
				token: await authService.authenticate(request.body),
				type: 'bearer'
			})
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Logout
routes.post('/logout', async (request, response) => {
	try {
		return response.json(await authService.logout())
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Get customer by token
routes.get('/customer', async (request, response) => {
	try {
		return response.json(await jwtService.decodeToken(request.headers.authorization))
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

module.exports = routes