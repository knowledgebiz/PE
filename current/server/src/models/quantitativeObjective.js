const Sequelize = require('sequelize')

const quantitativeObjective = sequelize.define('quantitive_objectives', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    objective: {
        type: Sequelize.STRING(50),
        allownull: false
    },
    id_answer_types: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = quantitativeObjective