const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Evaluation = require ('../models/evaluation')

router.get('/evaluation', async (req, res) => {

    try{
        if (!req.query.idWorker && !req.query.idEvaluationModel){

            return res.send(await Evaluation.findAll())
            
        }
        res.send(await Evaluation.findAll( {where: { [Op.or]: [ { id_worker : req.query.idWorker },  
                                            { id_evaluation_models: req.query.idEvaluationModel } ] }}))
    }
    catch {
        res.status(500).send()
    }
})

router.post('/evaluation', async (req, res) => {
    try {
        if (!req.query.idWorker || !req.body.json || !req.query.idEvaluationModel) {
            return res.status(400).send(`You must send the ID of the worker, the ID of the evaluation model and 
                                            the evaluation itself in JSON format.`)
        }
        const evaluation = await Evaluation.create({
            id_worker: req.query.idWorker,
            json: req.body.json,
            id_evaluation_models: idEvaluationModel
        })
        res.status(201).send()
    }
    catch {
        res.status(500).send()
    }
})

router.put('/evaluation', async (req, res) => {
    try {
        if (!req.body.json || !req.query.id || !req.query.idWorker || !req.query.idEvaluationModel) {
            return res.status(400).send(`You must send the ID of the evaluation, the ID of the worker, the ID of the evaluation model 
                                            and the new evaluation in JSON format.`)
        }
        await Evaluation.update( { id_worker: req.query.idWorker, json: req.body.json, id_evaluation_models: req.query.idEvaluationModel }, 
                                    { where: {id: req.query.id } })

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