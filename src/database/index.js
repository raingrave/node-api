const Sequelize = require('sequelize')

const dbConfig = require('../config/database.js')

const connection = new Sequelize(dbConfig)

const Customer = require('../models/Customer.js')

const Movie = require('../models/Movie.js')

const CustomerMovie = require('../models/CustomerMovie.js')

Customer.init(connection)

Movie.init(connection)

CustomerMovie.init(connection)

module.exports = connection