module.exports = async () => {
    const models = require('./models')

    models.evaluationCycle.hasOne(models.evaluationModel, {as: "EvaluationModel", foreignKey: 'id_evaluation_cycles'})
    models.evaluationModel.belongsTo(models.evaluationCycle, {as: "EvaluationCycle", onDelete: 'CASCADE', foreignKey: 'id_evaluation_cycles'})

    models.evaluationModel.hasMany(models.evaluation, {as: "Evaluations", foreignKey: 'id_evaluation_models'})
    models.evaluation.belongsTo(models.evaluationModel, {as: "EvaluationModel", onDelete: 'CASCADE', foreignKey: 'id_evaluation_models'})

    models.answerType.hasMany(models.quantitativeObjective, {as: "QuantitativeObjectives", foreignKey: 'id_answer_types'})
    models.quantitativeObjective.belongsTo(models.answerType, {as: "AnswerType", onDelete: 'CASCADE', foreignKey: 'id_answer_types'})
    
    models.answerType.hasMany(models.competency, {as: "Competencies", foreignKey: 'id_answer_types'})
    models.competency.belongsTo(models.answerType, {as: "AnswerType", onDelete: 'CASCADE', foreignKey: 'id_answer_types'})

    models.evaluationModel.belongsToMany(models.quantitativeObjective, {through: 'evalModelQuantObjective', onDelete: 'CASCADE',})
    models.quantitativeObjective.belongsToMany(models.evaluationModel, {through: 'evalModelQuantObjective', onDelete: 'CASCADE',})

    models.evaluationModel.belongsToMany(models.competency, {through: 'evalModelCompetency', onDelete: 'CASCADE',})
    models.competency.belongsToMany(models.evaluationModel, {through: 'evalModelCompetency', onDelete: 'CASCADE',})

    models.quantObjectiveType.hasMany(models.quantitativeObjective, {as: "QuantitativeObjectives", foreignKey: 'id_quantitative_objective_types'})
    models.quantitativeObjective.belongsTo(models.quantObjectiveType, {as: "QuantObjectiveType", foreignKey: 'id_quantitative_objective_types'})

}