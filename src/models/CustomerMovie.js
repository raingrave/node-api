const { Model, DataTypes } = require('sequelize')

class CustomerMovie extends Model {
	static init (sequelize) {
		super.init({
			customer_id: DataTypes.INTEGER,
			movie_id: DataTypes.INTEGER
		}, {
            sequelize,
            tableName: 'customer_movie'
		})
	}
}

module.exports = CustomerMovie