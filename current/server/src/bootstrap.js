module.exports = async () => {
    const models = require('./models')

    models.evaluationModel.hasMany(Evaluation, {as: "Evaluations", foreignKey: 'id_evaluation_models'})
    models.evaluation.belongsTo(models.evaluationModel, {as: "EvaluationModel", foreignKey: 'id_evaluation_models'})

    models.answerType.hasMany(models.quantitativeObjective, {as: "QuantitativeObjectives", foreignKey: 'id_answer_types'})
    models.quantitativeObjective.belongsTo(models.answerType, {as: "AnswerType", foreignKey: 'id_answer_types'})
    
    models.answerType.hasMany(models.competency, {as: "Competencies", foreignKey: 'id_answer_types'})
    models.competency.belongsTo(models.answerType, {as: "AnswerType", foreignKey: 'id_answer_types'})

    models.evaluationModel.belongsToMany(models.quantitativeObjective, {through: 'evalModelQuantObjective'})
    models.quantitativeObjective.belongsToMany(models.evaluationModel, {through: 'evalModelQuantObjective'})

    models.evaluationModel.belongsToMany(models.competency, {through: 'evalModelCompetency'})
    models.competency.belongsToMany(models.evaluationModel, {through: 'evalModelCompetency'})

    models.quantObjectiveType.hasMany(models.quantitativeObjective, {as: "QuantitativeObjectives", foreignKey: 'id_quantitative_objective_types'})
    models.quantitativeObjective.belongsTo(models.quantObjectiveType, {as: "QuantObjectiveType", foreignKey: 'id_quantitative_objective_types'})

}