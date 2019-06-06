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
      id_answer_types: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'answer_types', key: 'id'}
      }
    })

  },

  down: (queryInterface, Sequelize) => {
  
    return queryInterface.dropTable('quantitative_objectives');

  }
};
