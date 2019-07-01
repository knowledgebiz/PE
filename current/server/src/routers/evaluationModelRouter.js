const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const EvaluationModel = require('../models/evaluationModel')
const EvaluationCycle = require('../models/evaluationCycle')

router.get('/evaluationModel', async (req, res) => {

    try{
        const errMessage = 'Evaluation model not found'
        if (req.query.active && req.query.active == 1) {
            const response = await EvaluationModel.findOne( { where: { active: 1 } } )
            if (response) {
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }
        if (!req.query.model && !req.query.id){
            const response = await EvaluationModel.findAll()
            if (response[0]){
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }
        if (req.query.id){
            const response = await EvaluationModel.findOne( {where: { id: req.query.id } })
            if (response){
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }
        if (req.query.model){
            const response = await EvaluationModel.findAll( {where: { model : { [Op.like]: '%'+req.query.model+'%' } } } )
            if (response[0]){
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }
        const response = await EvaluationModel.findOne( { where: { id_evaluation_cycles: req.body.idCycle }} )
        if (response) {
            return res.send(response)
        }
        res.status(404).send(errMessage)
        
    }
    catch {
        res.status(500).send()
    }
})

router.post('/evaluationModel', async (req, res) => {
    try {
        if (!req.body.model || !req.body.idCycle) {
            return res.status(400).send('You must send the model\'s model and the ID of the evaluation cycle it belongs to')
        }
        
        const repeat = await EvaluationModel.findOne( { where: { [Op.or]: { model: req.body.model, id_evaluation_cycles: req.body.idCycle}}})
    
        if (repeat != null) {
            return res.status(409).send('An evaluation model with that model or cycle already exists')
        }
        const evalCycle = await EvaluationCycle.findOne( { where: {id: req.body.idCycle}})
        if (!evalCycle || evalCycle == null){
            return res.status(404).send('Evaluation cycle not found.')
        }
        const evaluationModel = await EvaluationModel.create({
            model: req.body.model,
            id_evaluation_cycles: req.body.idCycle
        })
        res.status(201).send(evaluationModel.model)
    }
    catch {
        res.status(500).send()
    }
})

router.patch('/evaluationModel', async (req, res) => {
    try {
        if (!req.body.model || !req.body.id) {
            return res.status(400).send('You must send the ID of the evaluation model and its new model')
        }
        const repeat = await EvaluationModel.findOne( { where: { model: req.body.model}})

        if (repeat != null && repeat.model === req.body.model) {
            return res.status(409).send('A model with this name or cycle already exists')
        }
        if (!req.body.idCycle){
            await EvaluationModel.update( { model: req.body.model }, { where: { id: req.body.id } })
            return res.send()
        }
        const evalCycle = await EvaluationCycle.findOne( { where: {id: req.body.idCycle}})
        if (!evalCycle || evalCycle == null){
            return res.status(404).send('Evaluation cycle not found.')
        }
        await EvaluationModel.update ( { model: req.body.model, id_evaluation_cycles: req.body.idCycle}, {where: { id: req.body.id } })
        res.send()
    }
    catch {
        res.status(500).send()
    }
})

router.patch('/evaluationModel/:id', async (req, res) => {
    try {
        const modelId = req.params.id
        if (modelId){

            const model = await EvaluationModel.findOne( { where: { id: modelId } } )
            if (!model) {
                return res.status(404).send('Evaluation model not found')
            }
            if (model && model.active == 1){
                await EvaluationModel.update( { active: 0}, {where: { id: modelId } } )
                return res.status(202).send('Evaluation model deactivated')
            }
            if (model && model.active == 0){
                await EvaluationModel.update( { active: 1}, {where: { id: modelId } } )
                return res.status(202).send('Evaluation model reactivated')
            }
        }
        res.status(400).send('You must send the id of the evaluation model you want to modify')
    }
    catch {
        res.status(500).send()
    }
})

router.delete('/evaluationModel', async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).send('You must send the ID of the model to delete')
        }
        await EvaluationModel.destroy({ where: { id: req.query.id } })
        res.status(204).send()
    }
    catch {
        res.status(500).send()
    }
})

module.exports = router