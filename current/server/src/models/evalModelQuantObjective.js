const Sequelize = require('sequelize')

const evalModelQuantObjective = sequelize.define('eval_models_has_quant_objectives', {
    id_evaluation_models: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'evaluationModel', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    id_quantitative_objectives: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'quantitativeObjective', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
})

evalModelQuantObjective.removeAttribute('id')

module.exports = evalModelQuantObjective