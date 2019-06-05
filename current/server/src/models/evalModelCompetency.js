const Sequelize = require('sequelize')

const evalModelCompetency = sequelize.define('eval_models_has_competencies', {
    id_evaluation_models: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'evaluationModel', key: 'id'}
    },
    id_competencies: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'competency', key: 'id'}
    }
}, {
    timestamps: false
})

module.exports = evalModelCompetency