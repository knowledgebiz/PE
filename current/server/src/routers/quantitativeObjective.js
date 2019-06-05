const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const QuantitativeObjective = require ('../models/quantitativeObjective')

router.get('/objective', async (req, res) => {

    try{
        if (!req.query.objective && !req.query.id && !req.query.idAnswerType){

            return res.send(await Competency.findAll())
            
        }
        if (req.query.idAnswerType){
            return res.send(await QuantitativeObjective.findAll( { where: { id_answer_type: req.query.idAnswerType } } ))
        }
        res.send(await QuantitativeObjective.findAll( {where: { [Op.or]: [ { objective : { [Op.like]: '%'+req.query.objective+'%' } }, 
                                                            { id: req.query.id } ] }}))
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
        let repeat = await QuantitativeObjective.findOne( { where: { objective: req.query.objective}})
        if (repeat.objective === req.query.objective) {
            return res.status(409).send('Quantitative objective already exists')
        }
        const quantitativeObjective = await QuantitativeObjective.create({
            objective: req.query.objective,
            id_answer_type: req.query.idAnswerType
        })
        res.status(201).send(comp.objective)
    }
    catch {
        res.status(500).send()
    }
})

router.put('/objective', async (req, res) => {
    try {
        if (!req.query.objective || !req.query.id) {
            return res.status(400).send('You must send the ID of the objective and its new value.')
        }
        let repeat = await QuantitativeObjective.findOne( { where: { objective: req.query.objective}})

        if (repeat != null && repeat.objective === req.query.objective) {
            return res.status(409).send('Quantitative objective already exists')
        }
        if (!req.query.idAnswerType || !req.query.idAnswerType === null){
            await QuantitativeObjective.update({ objective: req.query.objective }, { where: {id: req.query.id } })
        }
        else {
            if (await QuantitativeObjective.findOne( { where: { id_answer_type: req.query.idAnswerType } }) != null){
                await QuantitativeObjective.update( { objective: req.query.objective, id_answer_type: req.query.idAnswerType }, 
                                                        { where: { id: req.query.id} })
            }
            else {
                res.status(404).send('Answer type not found')
            }
        }
        res.send()
    }
    catch {
        res.status(500).send()
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