const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const QuantitativeObjective = require ('../models/quantitativeObjective')
const AnswerType = require ('../models/answerType')
const QuantObjectiveType = require ('../models/quantObjectiveType')

router.get('/objective', async (req, res) => {

    try{
        const errMessage = 'Quantitative objective not found'
        if (!req.query.objective && !req.query.id && !req.query.idAnswerType && !req.query.idObjectiveType){
            const response = await QuantitativeObjective.findAll()
            if (response[0]){
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }

        if (req.query.id) {
            const response = await QuantitativeObjective.findOne( { where: {id: req.query.id } } )
            if (response){
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }
        
        if (req.query.objective){
            const response = await QuantitativeObjective.findAll( {where: { objective : { [Op.like]: '%'+req.query.objective+'%' } } } )
            if (response[0]){
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }

        if (req.query.idAnswerType && req.query.idObjectiveType){
            const response = await QuantitativeObjective.findAll( { where: { [Op.and]: {id_answer_types: req.query.idAnswerType,
                id_quantitative_objective_types: req.query.idObjectiveType } } } )
            if (response[0]){
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }
        if (req.query.idAnswerType && !req.query.idObjectiveType){
            const response = await QuantitativeObjective.findAll( { where: { id_answer_types: req.query.idAnswerType} })
            if (response[0]){
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }
        const response = await QuantitativeObjective.findAll( { where: { id_quantitative_objective_types: req.query.idObjectiveType } } )
        if (response[0]){
            return res.send(response)
        }
        res.status(404).send(errMessage)
        
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
            return res.status(404).send('Answer type or objective type not found')
        }
        
    }
})

router.patch('/objective', async (req, res) => {
    try {
        if (!req.body.objective || !req.body.id) {
            return res.status(400).send('You must send the ID of the objective and its new value.')
        }

        if (!req.body.idAnswerType && !req.body.idObjectiveType){
            await QuantitativeObjective.update({ objective: req.body.objective }, { where: {id: req.body.id } })
            return res.send('Updated objective')
        }
        let verAnswer = await AnswerType.findOne( { where:  { id: req.body.idAnswerType } } ) != null

        let verObjective = await QuantObjectiveType.findOne( { where: {id: req.body.idObjectiveType} } )

        if (verAnswer && !verObjective){
            await QuantitativeObjective.update({ objective: req.body.objective, id_answer_types: req.body.idAnswerType }, 
                                                        { where: {id: req.body.id } })
            return res.send('Updated Answer Type')
        }
        if (!verAnswer && verObjective){
            await QuantitativeObjective.update({ objective: req.body.objective, id_quantitative_objective_types: req.body.idObjectiveType },
                                                        { where: {id: req.body.id } })
            return res.send('Updated Objective Type')
        }
        if (verAnswer && verObjective) {
            await QuantitativeObjective.update({ objective: req.body.objective, id_answer_types: req.body.idAnswerType,
                 id_quantitative_objective_types: req.body.idObjectiveType },
                { where: { id: req.body.id } })

            return res.send('Objective updated')
        }
        res.status(404).send('Neither answer type nor objective type not found')
    }
    catch (e){
        if (!e.original){
            return res.status(500).send('An internal error has occurred.')
        }
        if (e.original.errno == 1062)
        {
            return res.status(409).send('Duplicate entry')
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