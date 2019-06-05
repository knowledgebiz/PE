module.exports = async () => {
    const EvaluationModel = require('./models/evaluationModel')
    const Evaluation = require('./models/evaluation')
    const Competency = require('./models/competency')
    const QuantitativeObjective = require('./models/quantitativeObjective')
    const AnswerType = require('./models/answerType')

    EvaluationModel.hasMany(Evaluation, {as: "Evaluations", foreignKey: 'id_evaluation_models'})
    Evaluation.belongsTo(EvaluationModel, {as: "EvaluationModel", foreignKey: 'id_evaluation_models'})

    AnswerType.hasMany(QuantitativeObjective, {as: "QuantitativeObjectives", foreignKey: 'id_answer_types'})
    QuantitativeObjective.belongsTo(AnswerType, {as: "AnswerType", foreignKey: 'id_answer_types'})
    
    AnswerType.hasMany(Competency, {as: "Competencies", foreignKey: 'id_answer_types'})
    Competency.belongsTo(AnswerType, {as: "AnswerType", foreignKey: 'id_answer_types'})

    EvaluationModel.belongsToMany(QuantitativeObjective, {through: 'evalModelQuantObjective'})
    QuantitativeObjective.belongsToMany(EvaluationModel, {through: 'evalModelQuantObjective'})

    EvaluationModel.belongsToMany(Competency, {through: 'evalModelCompetency'})
    Competency.belongsToMany(EvaluationModel, {through: 'evalModelCompetency'})

//     const model = await EvaluationModel.create({
//         title: 'First Model' 
//     })
//     .catch(errHandler)

//     const evaluation = await Evaluation.create({ 
//         id_worker: 1, 
//         json: 'ola: "olaaa"', 
//         id_evaluation_models: model.id
//     })
//     .catch(errHandler)

//     const evaluations = await Evaluation.findAll({ where: {id_evaluation_models: 6} })
//     .catch(errHandler)

//     console.log('TESTE: ', evaluations)
}