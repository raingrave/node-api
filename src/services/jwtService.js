const jwt = require('jsonwebtoken')

exports.generateToken = (payload) => {
	return jwt.sign({
  		data: payload
	}, process.env.JWT_SECRET, {
		algorithm: process.env.JWT_ALGORITHM,
		expiresIn: process.env.JWT_LIFECICLE
	})
}

exports.tokenVerify = (token) => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET).id
	} catch(error) {
		return error.message
	}
}

exports.decodeToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET)
}