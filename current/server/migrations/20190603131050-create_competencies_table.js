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
      },
      id_answer_types: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'answer_types', key: 'id'}
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable('competencies');

  }
};
