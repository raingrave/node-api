const Sequelize = require('sequelize')

const connection = new Sequelize(require('../config/database.js'))

const Customer = require('../models/Customer.js')

Customer.init(connection)

module.exports = connection