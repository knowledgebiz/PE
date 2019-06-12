'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable("answer_types", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      type: {
          type: Sequelize.STRING(45),
          unique: true,
          allowNull: false
      }
    })

  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable('answer_types');
  }
};
