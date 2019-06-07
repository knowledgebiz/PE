const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const QuantObjectiveType = require ('../models/quantObjectiveType')

router.get('/objectiveType', async (req, res) => {

    try{
        if (!req.query.type && !req.query.id){

            return res.send(await QuantObjectiveType.findAll())
            
        }
        if (req.query.type){
            return res.send(await QuantObjectiveType.findAll( {where: { [Op.or]: [ { type : { [Op.like]: '%'+req.query.type+'%' } },  { id: req.query.id } ] }}))
        }
        res.send(await QuantObjectiveType.findOne( { where: { id: req.query.id } } ) )
    }
    catch {
        res.status(500).send()
    }
})

router.post('/objectiveType', async (req, res) => {
    try {
        if (!req.query.type) {
            return res.status(400).send('You must send a type')
        }
        const quantObjectiveType = await QuantObjectiveType.create({
            type: req.query.type
        })
        res.status(201).send(quantObjectiveType.type)
    }
    catch {
        res.status(500).send()
    }
})

router.patch('/objectiveType', async (req, res) => {
    try {
        if (!req.query.type || !req.query.id) {
            return res.status(400).send('You must send the ID of the answer type and its new type')
        }

        await QuantObjectiveType.update( { type: req.query.type }, { where: { id: req.query.id } })
        res.send()
    }
    catch {
        res.status(500).send()
    }
})

router.delete('/objectiveType', async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).send('You must send the ID of the type to delete')
        }
        await QuantObjectiveType.destroy({ where: { id: req.query.id } })
        res.status(204).send()
    }
    catch {
        res.status(500).send()
    }
})

module.exports = router