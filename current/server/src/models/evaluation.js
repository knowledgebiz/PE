const Sequelize = require('sequelize')

const evaluation = sequelize.define('evaluations', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    id_worker: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    json: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    id_evaluation_models: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = evaluation