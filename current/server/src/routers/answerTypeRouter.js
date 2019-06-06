const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const AnswerType = require ('../models/answerType')

router.get('/answerType', async (req, res) => {

    try{
        if (!req.query.type && !req.query.id){

            return res.send(await AnswerType.findAll())
            
        }
        if (req.query.type){
            return res.send(await AnswerType.findAll( {where: { [Op.or]: [ { type : { [Op.like]: '%'+req.query.type+'%' } },  { id: req.query.id } ] }}))
        }
        res.send(await AnswerType.findOne( { where: { id: req.query.id } } ) )
    }
    catch {
        res.status(500).send()
    }
})

router.post('/answerType', async (req, res) => {
    try {
        if (!req.query.type) {
            return res.status(400).send('You must send a type')
        }
        let repeat = await AnswerType.findOne( { where: { type: req.query.type}})

        if (repeat != null) {
            return res.status(409).send('Type already exists')
        }
        const answerType = await AnswerType.create({
            type: req.query.type
        })
        res.status(201).send(answerType.type)
    }
    catch {
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