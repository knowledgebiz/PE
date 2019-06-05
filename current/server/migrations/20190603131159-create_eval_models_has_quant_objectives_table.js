'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("eval_models_has_quant_objectives", {
      id_evaluation_models: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'evaluation_models', key: 'id'}
      },
      id_quantitative_objectives: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'quantitative_objectives', key: 'id'}
      }
    })
  },

  down: (queryInterface, Sequelize) => {
  
    return queryInterface.dropTable('eval_models_has_quant_objectives');
  }
};
