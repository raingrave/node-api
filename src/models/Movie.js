
const { Model, DataTypes } = require('sequelize')

class Movie extends Model {
	static init (sequelize) {
		super.init({
			title: DataTypes.STRING,
			director: DataTypes.STRING,
		}, {
			sequelize
		})
	}
}

module.exports = Movie