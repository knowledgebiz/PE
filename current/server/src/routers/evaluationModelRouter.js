const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const EvaluationModel = require('../models/evaluationModel')
const EvaluationCycle = require('../models/evaluationCycle')

router.get('/evaluationModel', async (req, res) => {

    try{
        if (!req.query.title && !req.query.id){
            return res.send(await EvaluationModel.findAll())
        }
        if (req.query.id){
            return res.send(await EvaluationModel.findAll( {where: { id: req.query.id } }))
        }
        res.send(await EvaluationModel.findAll( {where: { title : { [Op.like]: '%'+req.query.title+'%' } } } ))
    }
    catch {
        res.status(500).send()
    }
})

router.post('/evaluationModel', async (req, res) => {
    try {
        if (!req.body.title || !req.body.idCycle) {
            return res.status(400).send('You must send the model\'s title and the ID of the evaluation cycle it belongs to')
        }
        
        let repeat = await EvaluationModel.findOne( { where: { [Op.or]: { title: req.body.title, id_evaluation_cycles: req.body.idCycle}}})
    
        if (repeat != null) {
            return res.status(409).send('An evaluation model with that title or cycle already exists')
        }
        let evalCycle = await EvaluationCycle.findOne( { where: {id: req.body.idCycle}})
        if (!evalCycle || evalCycle == null){
            return res.status(404).send('Evaluation cycle not found.')
        }
        const evaluationModel = await EvaluationModel.create({
            title: req.body.title,
            id_evaluation_cycles: req.body.idCycle
        })
        res.status(201).send(evaluationModel.title)
    }
    catch {
        res.status(500).send()
    }
})

router.patch('/evaluationModel', async (req, res) => {
    try {
        if (!req.body.title || !req.body.id) {
            return res.status(400).send('You must send the ID of the evaluation model and its new title')
        }
        let repeat = await EvaluationModel.findOne( { where: { title: req.body.title}})

        if (repeat != null && repeat.title === req.body.title) {
            return res.status(409).send('A model with this title already exists')
        }
        if (!req.body.idCycle){
            await EvaluationModel.update( { title: req.body.title }, { where: { id: req.body.id } })
            return res.send()
        }
        let evalCycle = await EvaluationCycle.findOne( { where: {id: req.body.idCycle}})
        if (!evalCycle || evalCycle == null){
            return res.status(404).send('Evaluation cycle not found.')
        }
        await EvaluationModel.update ( { title: req.body.title, id_evaluation_cycles: req.body.idCycle}, {where: { id: req.body.id } })
        res.send()
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