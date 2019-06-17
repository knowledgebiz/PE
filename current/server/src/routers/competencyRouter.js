const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Competency = require ('../models/competency')
const AnswerType = require ('../models/answerType')

router.get('/competency', async (req, res) => {

    try{
        const errMessage = 'Competency not found.'
        if (!req.query.competency && !req.query.id && !req.query.idAnswerType){
            const response = await Competency.findAll()
            if (response[0]){
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }
        if (req.query.id) {
            const response = await Competency.findOne( { where: {id: req.query.id } } )
            if (response){
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }
        if (req.query.competency){
            const response = await Competency.findAll( {where: { competency : { [Op.like]: '%'+req.query.competency+'%' } } } )
            if (response[0]){
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }
        const response = await Competency.findAll( { where: { id_answer_types: req.query.idAnswerType } } )
        if (response[0]){
            return res.send(response)
        }
        res.status(404).send(errMessage)
        
    }
    catch {
        res.status(500).send()
    }
})

router.post('/competency', async (req, res) => {
    try {
        if (!req.body.competency || !req.body.idAnswerType) {
            return res.status(400).send('Error: Competency, its answer type or both have not been sent.')
        }
        const comp = await Competency.create({
            competency: req.body.competency,
            id_answer_types: req.body.idAnswerType
        })
        res.status(201).send(comp.competency)
    }
    catch (e){
        if( !e.original )
        {
            return res.status(500).send('An internal error has occurred.')
        }
        if (e.original.errno == 1062)
        {
            return res.status(409).send('Duplicate entry')
        }
        if(e.original.errno == 1452) {
            return res.status(404).send('Answer type not found')
        }
        res.status(500).send('An internal error has occurred.')
        
    }
})

router.patch('/competency', async (req, res) => {
    try {
        if (!req.body.competency || !req.body.id) {
            return res.status(400).send('You must send the ID of the competency and its new value.')
        }
        
        if (req.body.idAnswerType == null || !req.body.idAnswerType){
            await Competency.update({ competency: req.body.competency }, { where: {id: req.body.id } })
        }
        else {
            if (await AnswerType.findOne( { where: { id: req.body.idAnswerType } }) != null){
                await Competency.update( { competency: req.body.competency, id_answer_types: req.body.idAnswerType }, 
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
        res.status(500).send('An internal error has occurred.')
        
    }
})

router.delete('/competency', async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).send('You must send the ID of the competency to delete')
        }
        
        await Competency.destroy({ where: { id: req.query.id } })
        res.status(204).send()
    }
    catch {
        res.status(500).send()
    }
})

module.exports = router