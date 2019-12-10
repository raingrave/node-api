const express = require('express')

const routes = express.Router()

const customerService = require('../services/customerService.js')

const movieService = require('../services/movieService')

const authService = require('../services/authService.js')

const verifyToken = require('../middleware/verifyToken.js')

// API
routes.get('/', (request, response) => {
	return response.send('API')
})

// All
routes.get('/customers', verifyToken, async (request, response) => {
	return response.json({
		code: 200,
		data: await customerService.getAll()
	})
})

// Read
routes.get('/customers/:id', verifyToken, async (request, response) => {
	try {
		return response.json({
			data: await customerService.findById(request.params.id)
		})
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Create
routes.post('/customers', async (request, response) => {
	try {
		const customer = await customerService.create(request.body)

		return response.set('endpoint', `http://localhost:9090/customers/${customer.id}`)
					   .json(customer)
					   
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Update
routes.put('/customers/:id', verifyToken, async (request, response) => {
	try {
		return response.set('endpoint', `http://localhost:9090/customers/${request.params.id}`)
					   .json(await customerService.update(request.params.id, request.body))
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Delete
routes.delete('/customers/:id', verifyToken, async (request, response) => {
	try {
		return response.json(await customerService.delete(request.params.id))
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Rent
routes.post('/customers/:id', verifyToken, async (request, response) => {
	try {
		return response.json(await customerService.rent(request.params.id, request.body))
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// All
routes.get('/movies', verifyToken, async (request, response) => {
	return response.json({
		code: 200,
		data: await movieService.getAll()
	})
})

// Read
routes.get('/movies/:id', verifyToken, async (request, response) => {
	try {
		return response.json({
			data: await movieService.findById(request.params.id)
		})
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Create
routes.post('/movies', async (request, response) => {
	try {
		const movie = await movieService.create(request.body)

		return response.set('endpoint', `http://localhost:9090/movies/${movie.id}`)
					   .json(movie)
					   
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Update
routes.put('/movies/:id', verifyToken, async (request, response) => {
	try {
		return response.set('endpoint', `http://localhost:9090/movies/${request.params.id}`)
					   .json(await movieService.update(request.params.id, request.body))
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

// Delete
routes.delete('/movies/:id', verifyToken, async (request, response) => {
	try {
		return response.json(await movieService.delete(request.params.id))
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

//Auth
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

module.exports = routes