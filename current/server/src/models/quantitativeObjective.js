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
    id_quantitative_objective_types: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'quantitativeObjectiveType', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
})

module.exports = quantitativeObjective