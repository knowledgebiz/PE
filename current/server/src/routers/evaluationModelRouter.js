const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const EvaluationModel = require ('../models/evaluationModel')

router.get('/evaluationModel', async (req, res) => {

    try{
        if (!req.query.title && !req.query.id){
            return res.send(await EvaluationModel.findAll())
        }
        if (!req.query.title){
            return res.send(await EvaluationModel.findAll( {where: { id: req.query.id } }))
        }
        return res.send(await EvaluationModel.findAll( {where: { [Op.or]: [ { title : { [Op.like]: '%'+req.query.title+'%' } },  
                                                            { id: req.query.id } ] }}))
    }
    catch {
        res.status(500).send()
    }
})

router.post('/evaluationModel', async (req, res) => {
    try {
        if (!req.query.title) {
            return res.status(400).send('You must send a type')
        }
        
        let repeat = await EvaluationModel.findOne( { where: { title: req.query.title}})
        if (repeat != null && repeat.title === req.query.title) {
            return res.status(409).send('An evaluation model with that title already exists')
        }
        const evaluationModel = await EvaluationModel.create({
            title: req.query.title
        })
        res.status(201).send(evaluationModel.title)
    }
    catch {
        res.status(500).send()
    }
})

router.patch('/evaluationModel', async (req, res) => {
    try {
        if (!req.query.title || !req.query.id) {
            return res.status(400).send('You must send the ID of the evaluation model and its new title')
        }
        let repeat = await EvaluationModel.findOne( { where: { title: req.query.title}})

        if (repeat != null && repeat.title === req.query.title) {
            return res.status(409).send('A model with this title already exists')
        }

        await EvaluationModel.update( { title: req.query.title }, { where: { id: req.query.id } })
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