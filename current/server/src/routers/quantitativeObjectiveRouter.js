const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const QuantitativeObjective = require ('../models/quantitativeObjective')
const AnswerType = require ('../models/answerType')

router.get('/objective', async (req, res) => {

    try{

        if (!req.query.objective && !req.query.id && !req.query.idAnswerType && !req.query.idObjectiveType){
            return res.send(await QuantitativeObjective.findAll())
            
        }
        if (req.query.id) {
            return res.send(await QuantitativeObjective.findOne( { where: {id: req.query.id } } ))
        }
        
        if (req.query.objective){
            return res.send(await QuantitativeObjective.findAll( {where: { objective : { [Op.like]: '%'+req.query.objective+'%' } } } ))
            
        }
        if (req.query.idAnswerType && req.query.idObjectiveType){
            return res.send(await QuantitativeObjective.findAll( { where: { [Op.and]: {id_answer_types: req.query.idAnswerType,
                                                                    id_quantitative_objective_types: req.query.idObjectiveType } } } ))
        }
        if (req.query.idAnswerType && !req.query.idObjectiveType){
            return res.send(await QuantitativeObjective.findAll( { where: { id_answer_types: req.query.idAnswerType} }))
        }
        res.send(await QuantitativeObjective.findAll( { where: { id_quantitative_objective_types: req.query.idObjectiveType } } ))
        
    }
    catch {
        res.status(500).send()
    }
})

router.post('/objective', async (req, res) => {
    try {
        if (!req.body.objective || !req.body.idAnswerType || !req.body.idObjectiveType) {
            return res.status(400).send('Error: You must send the objective, its answer type and objective type.')
        }
        const quantitativeObjective = await QuantitativeObjective.create({
            objective: req.body.objective,
            id_answer_types: req.body.idAnswerType,
            id_quantitative_objective_types: req.body.idObjectiveType
        })
        res.status(201).send(quantitativeObjective.objective)
    }
    catch (e){
        if (!e.original){
            return res.status(500).send('An internal error appears to have occurred.')
        }
        if (e.original.errno == 1062)
        {
            return res.status(409).send('Duplicate entry')
        }
        if (e.original.errno == 1452)
        {
            return res.status(409).send('Answer type or objective type not found')
        }
        
    }
})

router.patch('/objective', async (req, res) => {
    try {
        if (!req.body.objective || !req.body.id) {
            return res.status(400).send('You must send the ID of the objective and its new value.')
        }

        if (!req.body.idAnswerType){
            await QuantitativeObjective.update({ objective: req.body.objective }, { where: {id: req.body.id } })
        }
        
        else {
            if (await AnswerType.findOne( { where: { id: req.body.idAnswerType } }) != null){
                await QuantitativeObjective.update( { objective: req.body.objective, id_answer_types: req.body.idAnswerType }, 
                                                        { where: { id: req.body.id} })
            }
            else {
                res.status(404).send('Answer type not found')
            }
        }
        res.send()
    }
    catch (e){
        if (!e.original){
            return res.status(500).send('An internal error has occurred.')
        }
        if (e.original.errno == 1062)
        {
            return res.status(409).send('Duplicate entry')
        }
        if (e.original.errno == 1452)
        {
            return res.status(409).send('Answer type not found')
        }
        
    }
})

router.delete('/objective', async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).send('You must send the ID of the objective to delete')
        }
        await QuantitativeObjective.destroy({ where: { id: req.query.id } })
        res.status(204).send()
    }
    catch {
        res.status(500).send()
    }
})

module.exports = router