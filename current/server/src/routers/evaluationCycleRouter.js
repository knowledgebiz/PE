const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const EvaluationCycle = require ('../models/evaluationCycle')

router.get('/evaluationCycle', async (req, res) => {

    try{
        if (!req.query.startDate && !req.query.endDate && !req.query.id){

            return res.send(await EvaluationCycle.findAll())
            
        }
        if (!req.query.startDate && !req.query.endDate) {
            return res.send(await EvaluationCycle.findOne( {where: { id: req.query.id  } }))
        }

        if(!req.query.startDate) {
            (!req.query.startDate == '')
        }
        if(!req.query.endDate) {
            (!req.query.endDate == '')
        }

        res.send(await EvaluationCycle.findAll( { where: { [Op.or]:  {start_date: req.query.startDate, end_date: req.query.endDate} } } ) )
    }
    catch {
        res.status(500).send()
    }
})

router.post('/evaluationCycle', async (req, res) => {
    try {
        if (!req.query.startDate || !req.query.endDate) {
            return res.status(400).send('You must send the start date and end date of the cycle')
        }
        let repeat = await EvaluationCycle.findOne( { where: { [Op.and]: {start_date: req.query.startDate, end_date: req.query.endDate } }})

        if (repeat != null) {
            return res.status(409).send('A cycle with those exact dates already exists')
        }
        const evaluationCycle = await EvaluationCycle.create({
            start_date: req.query.startDate,
            end_date: req.query.endDate
        })
        res.status(201).send('Start date: ' + evaluationCycle.start_date + '\nEnd date: ' + evaluationCycle.end_date)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.patch('/answerType', async (req, res) => {
    try {
        if (!req.query.type || !req.query.id) {
            return res.status(400).send('You must send the ID of the answer type and its new type')
        }
        let repeat = await AnswerType.findOne( { where: { type: req.query.type}})

        if (repeat != null && repeat.type === req.query.type) {
            return res.status(409).send('Type already exists')
        }

        await AnswerType.update( { type: req.query.type }, { where: { id: req.query.id } })
        res.send()
    }
    catch {
        res.status(500).send()
    }
})

router.delete('/evaluationCycle', async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).send('You must send the ID of the cycle to delete')
        }
        await EvaluationCycle.destroy({ where: { id: req.query.id } })
        res.status(204).send()
    }
    catch {
        res.status(500).send()
    }
})

module.exports = router