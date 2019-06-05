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
        allowNull: false
      },
      updatedAt: Sequelize.DATE,
      id_evaluation_models: 
      {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'evaluation_models', key: 'id'}
      }
    })
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('evaluations');
  }
};
