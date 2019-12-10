'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customer_movie', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'customers',
          },
          key: 'id'
        },
        allowNull: false
      },
      movie_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'movies',
          },
          key: 'id'
        },
        allowNull: false
      },
      /*director: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },*/
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('customer_movie')
  }
};
