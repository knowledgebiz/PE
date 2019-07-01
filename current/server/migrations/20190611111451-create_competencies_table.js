'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable("competencies", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      competency: {
          type: Sequelize.STRING(50),
          allowNull: true,
          unique: true
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable('competencies');

  }
};
