const Sequelize = require('sequelize')

const evaluationModel = sequelize.define('evaluation_models', {
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

module.exports = evaluationModel