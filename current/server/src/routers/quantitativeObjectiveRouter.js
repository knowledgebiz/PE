const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const QuantitativeObjective = require ('../models/quantitativeObjective')
const AnswerType = require ('../models/answerType')

router.get('/objective', async (req, res) => {

    try{

        if(!req.query.objective){
            req.query.objective = ''
        }
        if (!req.query.id) {
            req.query.id = ''
        }
        if (!req.query.idAnswerType){
            req.query.idAnswerType = ''
        }


        if (!req.query.objective && !req.query.id && !req.query.idAnswerType){
            return res.send(await QuantitativeObjective.findAll())
            
        }
        if (req.query.id) {
            return res.send(await QuantitativeObjective.findOne( { where: {id: req.query.id } } ))
        }
        
        if (!req.query.objective){
            return res.send(await QuantitativeObjective.findAll( { where: {id_answer_types: req.query.idAnswerType}}))
        }
        res.send(await QuantitativeObjective.findAll( {where: { objective : { [Op.like]: '%'+req.query.objective+'%' } } } ))
    }
    catch {
        res.status(500).send()
    }
})

router.post('/objective', async (req, res) => {
    try {
        if (!req.query.objective || !req.query.idAnswerType) {
            return res.status(400).send('Error: Quantitative objective, its answer type or both have not been sent.')
        }
        const quantitativeObjective = await QuantitativeObjective.create({
            objective: req.query.objective,
            id_answer_types: req.query.idAnswerType
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
        
    }
})

router.patch('/objective', async (req, res) => {
    try {
        if (!req.query.objective || !req.query.id) {
            return res.status(400).send('You must send the ID of the objective and its new value.')
        }

        if (!req.query.idAnswerType){
            await QuantitativeObjective.update({ objective: req.query.objective }, { where: {id: req.query.id } })
        }
        
        else {
            if (await AnswerType.findOne( { where: { id: req.query.idAnswerType } }) != null){
                await QuantitativeObjective.update( { objective: req.query.objective, id_answer_types: req.query.idAnswerType }, 
                                                        { where: { id: req.query.id} })
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