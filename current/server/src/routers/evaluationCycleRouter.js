const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const EvaluationCycle = require ('../models/evaluationCycle')

router.get('/evaluationCycle', async (req, res) => {

    try{
        const errMessage = 'Evaluation cycle not found'
        if (!req.query.startDate && !req.query.endDate && !req.query.id){

            const response = await EvaluationCycle.findAll()
            if (response[0]) {
                return res.send(response)
            }
            return res.status(404).send(errMessage)
            
        }

        if (req.query.id) {
            const response = await EvaluationCycle.findOne( {where: { id: req.query.id  } })
            if (response) {
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }

        if (req.query.startDate && req.query.endDate){

            
            const response = await EvaluationCycle.findOne( { where: { [Op.and]:  {start_date: req.query.startDate, end_date: req.query.endDate }}})
            if (response){
                return res.send(response)
            }
            return res.status(404).send(errMessage)

        }

        if (req.query.startDate && !req.query.endDate) {

            const response = await EvaluationCycle.findAll( { where: { start_date: req.query.startDate } } )
            if (response[0]){
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }
        const response = await EvaluationCycle.findAll( { where: { end_date: req.query.endDate } } )
        if (response[0]) {
            return res.send(response)
        }
        res.status(404).send(errMessage)
    }
    catch {
        res.status(500).send()
    }
})

router.post('/evaluationCycle', async (req, res) => {
    try {
        if (!req.body.startDate || !req.body.endDate) {
            return res.status(400).send('You must send the start date and end date of the cycle')
        }
        const repeat = await EvaluationCycle.findOne( { where: { [Op.and]: {start_date: req.body.startDate, end_date: req.body.endDate } }})

        if (repeat != null) {
            return res.status(409).send('A cycle with those exact dates already exists')
        }
        const evaluationCycle = await EvaluationCycle.create({
            start_date: req.body.startDate,
            end_date: req.body.endDate
        })
        res.status(201).send('Start date: ' + evaluationCycle.start_date + '\nEnd date: ' + evaluationCycle.end_date)
    }
    catch (e) {
        res.status(500).send()
    }
})

router.patch('/evaluationCycle', async (req, res) => {
    try {
        if (!req.body.startDate || !req.body.endDate || !req.body.id) {
            return res.status(400).send('You must send the ID of the cycle and its new dates')
        }

        const repeat = await EvaluationCycle.findOne( { where: { [Op.and]: { start_date: req.body.startDate, end_date: req.body.endDate } } } )

        if (repeat != null) {
            return res.status(409).send('Cycle already exists')
        }

        await EvaluationCycle.update( { start_date: req.body.startDate, end_date: req.body.endDate }, { where: { id: req.body.id } })
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