'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable("quantitative_objectives", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      objective: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true
      },
      id_quantitative_objective_types: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    })

  },

  down: (queryInterface, Sequelize) => {
  
    return queryInterface.dropTable('quantitative_objectives');

  }
};
