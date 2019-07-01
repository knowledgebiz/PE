module.exports = async () => {
    const models = require('./models')

    models.evaluationCycle.hasOne(models.evaluationModel, {as: "evaluation_models", foreignKey: 'id_evaluation_cycles', sourceKey: 'id', onDelete: 'SET NULL', onUpdate: 'CASCADE', hooks: true})
    models.evaluationModel.belongsTo(models.evaluationCycle, {as: "evaluation_cycles", foreignKey: 'id_evaluation_cycles', targetKey: 'id', onDelete: 'SET NULL', onUpdate: 'CASCADE', hooks: true})

    models.evaluationModel.hasMany(models.evaluation, {as: "Evaluations", foreignKey: 'id_evaluation_models', sourceKey: 'id', hooks: true})
    models.evaluation.belongsTo(models.evaluationModel, {as: "EvaluationModel", onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: 'id_evaluation_models', targetKey: 'id', hooks: true})

    models.evaluationModel.belongsToMany(models.quantitativeObjective, {through: 'eval_models_has_quant_objectives', foreignKey: 'id_quantitative_objectives', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    models.quantitativeObjective.belongsToMany(models.evaluationModel, {through: 'eval_models_has_quant_objectives', foreignKey: 'id_quantitative_objectives', onDelete: 'CASCADE', onUpdate: 'CASCADE'})

    models.evaluationModel.belongsToMany(models.competency, {through: 'eval_models_has_competencies', foreignKey: 'id_competencies', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    models.competency.belongsToMany(models.evaluationModel, {through: 'eval_models_has_competencies', foreignKey: 'id_competencies', onDelete: 'CASCADE', onUpdate: 'CASCADE'})

    models.quantObjectiveType.hasMany(models.quantitativeObjective, {as: "QuantitativeObjectives", foreignKey: 'id_quantitative_objective_types', sourceKey: 'id', hooks: true})
    models.quantitativeObjective.belongsTo(models.quantObjectiveType, {as: "QuantObjectiveType", onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: 'id_quantitative_objective_types', targetKey: 'id', hooks: true})
    sequelize.sync()
}