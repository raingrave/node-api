const express = require('express')

const routes = express.Router()

const customerService = require('../services/customerService.js')

const authService = require('../services/authService.js')

const verifyToken = require('../middleware/verifyToken.js')

routes.get('/', (request, response) => {
	return response.send('API')
})


routes.get('/customers', verifyToken, async (request, response) => {
	return response.json({
		code: 200,
		data: await customerService.getAll()
	})
})

routes.get('/customers/:id', verifyToken, async (request, response) => {
	try {
		return response.json({
			data: await customerService.findById(request.params.id)
		})
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

routes.put('/customers/:id', verifyToken, async (request, response) => {
	try {
		return response.set('endpoint', `http://localhost:9090/customers/${request.params.id}`)
					   .json(await customerService.update(request.params.id, request.body))
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

routes.post('/customers', verifyToken, async (request, response) => {
	try {
		const user = await customerService.create(request.body)

		return response.set('endpoint', `http://localhost:9090/customers/${user.id}`)
					   .json(user)
					   
	} catch (error) {
		return response.status(error.statusCode).json(error.payload)
	}
})

routes.delete('/customers/:id', verifyToken, async (request, response) => {
	try {
		return response.json(await customerService.delete(request.params.id))
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
		return response
			.status(400)
			.json(error.output.payload)
	}
})

module.exports = routes