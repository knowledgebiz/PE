'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable("evaluation_models", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
          type: Sequelize.STRING(45),
          unique: true,
          allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: Sequelize.DATE,
      active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('evaluation_models');
    
  }
};
