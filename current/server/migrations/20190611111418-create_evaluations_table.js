'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("evaluations", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_worker: {
        type: Sequelize.INTEGER,
        allownull: false
      },
      json: {
          type: Sequelize.TEXT,
          allownull: false
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
      id_evaluation_models: 
      {
          type: Sequelize.INTEGER,
          allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('evaluations');
  }
};
