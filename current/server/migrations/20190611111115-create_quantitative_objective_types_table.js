'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable("quantitative_objective_types", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      type: {
          type: Sequelize.STRING(15),
          unique: true,
          allowNull: false
      }
    })

  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable('quantitative_objective_types');
    
  }
};
