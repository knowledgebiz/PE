'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("eval_models_has_competencies", {
      id_evaluation_models: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'evaluation_models', key: 'id'}
      },
      id_competencies: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'competencies', key: 'id'}
      }
    })
  },

  down: (queryInterface, Sequelize) => {
  
    return queryInterface.dropTable('eval_models_has_competencies');
  }
};
