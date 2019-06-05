const Sequelize = require('sequelize')

const evalModelQuantObjective = sequelize.define('eval_models_has_competencies', {
    id_evaluation_models: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'evaluationModel', key: 'id'}
    },
    id_quantitative_objectives: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'quantitativeObjective', key: 'id'}
    }
}, {
    timestamps: false
})

module.exports = evalModelQuantObjective