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
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NULL ON UPDATE CURRENT_TIMESTAMP')
      },
      active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
      id_evaluation_cycles: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      }
    })
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('evaluation_models');
    
  }
};
