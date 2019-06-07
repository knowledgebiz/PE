const Sequelize = require('sequelize')

const quantitativeObjective = sequelize.define('quantitative_objectives', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    objective: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    id_answer_types: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_quantitative_objective_types: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = quantitativeObjective