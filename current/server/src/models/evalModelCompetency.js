const Sequelize = require('sequelize')

const evalModelCompetency = sequelize.define('eval_models_has_competencies', {
    id_evaluation_models: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'evaluationModel', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    id_competencies: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'competency', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    timestamps: false
})
evalModelCompetency.removeAttribute('id')

module.exports = evalModelCompetency