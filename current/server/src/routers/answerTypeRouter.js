const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const AnswerType = require ('../models/answerType')

router.get('/answerType', async (req, res) => {

    try{
        if (!req.query.type && !req.query.id){
            const response = await AnswerType.findAll()
            if (response[0]){
                return res.send(response)
            }
            return res.status(404).send('Answer type not found')
        }
        if (req.query.id){
            const response = await AnswerType.findOne( { where: { id: req.query.id } } ) 
            if (response){
                return res.send(response)
            }
            return res.status(404).send('Answer type not found')
        }
        const response = await AnswerType.findAll( {where: { type : { [Op.like]: '%'+req.query.type+'%' } } } ) 
        if (response[0]){
            return res.send(response)
        }
        res.status(404).send('Answer type not found')
        
    }
    catch {
        res.status(500).send()
    }
})

router.post('/answerType', async (req, res) => {
    try {
        if (!req.body.type) {
            return res.status(400).send('You must send a type')
        }
        let repeat = await AnswerType.findOne( { where: { type: req.body.type}})

        if (repeat != null) {
            return res.status(409).send('Type already exists')
        }
        const answerType = await AnswerType.create({
            type: req.body.type
        })
        res.status(201).send(answerType.type)
    }
    catch {
        res.status(500).send()
    }
})

router.patch('/answerType', async (req, res) => {
    try {
        if (!req.body.type || !req.body.id) {
            return res.status(400).send('You must send the ID of the answer type and its new type')
        }
        let repeat = await AnswerType.findOne( { where: { type: req.body.type}})

        if (repeat != null) {
            return res.status(409).send('Type already exists')
        }

        await AnswerType.update( { type: req.body.type }, { where: { id: req.body.id } })
        res.send()
    }
    catch {
        res.status(500).send()
    }
})

router.delete('/answerType', async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).send('You must send the ID of the type to delete')
        }
        await AnswerType.destroy({ where: { id: req.query.id } })
        res.status(204).send()
    }
    catch {
        res.status(500).send()
    }
})

module.exports = router