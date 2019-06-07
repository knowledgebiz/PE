'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("evaluation_cycles", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      start_date: {
          type: Sequelize.DATE,
          unique: true,
          allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        unique: true,
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable('evaluation_cycles');
    
  }
};
