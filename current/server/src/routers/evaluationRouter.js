const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Evaluation = require ('../models/evaluation')

router.get('/evaluation', async (req, res) => {

    try{
        const errMessage = 'Evaluation not found'
        if (!req.query.idWorker && !req.query.idEvaluationModel && !req.query.id){
            const response = await Evaluation.findAll()
            if (response) {
                return res.send(response)
            }
            return res.status(404).send()
        }
        if (req.query.id){
            const response = await Evaluation.findOne( { where: { id: req.query.id } } )
            if (response) {
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }
        if (req.query.idWorker && req.query.idEvaluationModel) {
            const response = await Evaluation.findAll( {where: { [Op.and]: [ { id_worker : req.query.idWorker },  
                { id_evaluation_models: req.query.idEvaluationModel } ] }})
            if (response){
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }
        if (req.query.idWorker && !req.query.idEvaluationModel) {
            const response = await Evaluation.findAll( { where: { id_worker: req.query.idWorker } } )
            if (response){
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }
        const response = await Evaluation.findAll( { where: { id_evaluation_models: req.query.idEvaluationModel } } )
        if (response) {
            return res.send(response)
        }
        res.status(404).send(errMessage)
    }
    catch {
        res.status(500).send()
    }
})

router.post('/evaluation', async (req, res) => {
    try {
        if (!req.body.idWorker || !req.body.json || !req.body.idEvaluationModel) {
            return res.status(400).send('You must send the ID of the worker, the ID of the evaluation model and the evaluation itself in JSON format.')
        }

        await Evaluation.create({
            id_worker: req.body.idWorker,
            json: req.body.json,
            id_evaluation_models: req.body.idEvaluationModel
        })
        res.status(201).send()
    }
    catch (e) {
        if (!e.original){
            return res.status(500).send('An internal error appears to have occurred')
        }
        if (e.original.errno == 1452){
            return res.status(404).send('Evaluation model not found')
        }
        res.status(500).send('An internal error appears to have occurred')
    }
})

router.patch('/evaluation', async (req, res) => {
    try {
        if (!req.body.json || !req.body.id || !req.body.idWorker || !req.body.idEvaluationModel) {
            return res.status(400).send('You must send the ID of the evaluation, the ID of the worker, the ID of the evaluation model and the new evaluation in JSON format.')
        }
        await Evaluation.update( { id_worker: req.body.idWorker, json: req.body.json, id_evaluation_models: req.body.idEvaluationModel }, 
                                    { where: {id: req.body.id } })
        res.send()
    }
    catch {
        res.status(500).send()
    }
})

router.delete('/evaluation', async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).send('You must send the ID of the evaluation to delete')
        }
        await Evaluation.destroy({ where: { id: req.query.id } })
        res.status(204).send()
    }
    catch {
        res.status(500).send()
    }
})

module.exports = router