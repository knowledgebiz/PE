const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Competency = require ('../models/competency')

router.get('/competency', async (req, res) => {

    try{
        
        if (!req.query.competency && !req.query.id && !req.query.idAnswerType){

            return res.send(await Competency.findAll())
            
        }
        if (req.query.competency === '' || !req.query.competency) {
                return res.send(await Competency.findAll( { where: { [Op.or]: [{id: req.query.id}, {id_answer_types: req.query.idAnswerType}] } } ))
        }
        console.log(req.query)
        if (!req.query.id) {
            return res.send(await Competency.findAll( { where: { competency: { [Op.like]: '%'+req.query.competency+'%' }}} ))
        }
        res.send(await Competency.findAll( {where: { [Op.or]: [ { competency : { [Op.like]: '%'+req.query.competency+'%' } }, 
                                                { id: req.query.id } ] } }))
    }
    catch {
        res.status(500).send()
    }
})

router.post('/competency', async (req, res) => {
    try {
        console.log(repeat.noidea)
        if (!req.query.competency || !req.query.idAnswerType) {
            return res.status(400).send('Error: Competency, its answer type or both have not been sent.')
        }
        const comp = await Competency.create({
            competency: req.query.competency,
            id_answer_types: req.query.idAnswerType
        })
        res.status(201).send(comp.competency)
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

router.patch('/competency', async (req, res) => {
    try {
        if (!req.query.competency || !req.query.id) {
            return res.status(400).send('You must send the ID of the competency and its new value.')
        }
        
        if (req.query.idAnswerType == null || !req.query.idAnswerType){
            await Competency.update({ competency: req.query.competency }, { where: {id: req.query.id } })
        }
        else {
            if (await Competency.findOne( { where: { id_answer_types: req.query.idAnswerType } }) != null){
                await Competency.update( { competency: req.query.competency, id_answer_types: req.query.idAnswerType }, 
                                            { where: { id: req.query.id} })
            }
            else {
                res.status(404).send('Answer type not found')
            }
        }
        res.send()
    }
    catch (e) {
        console.log(e)
        res.status(500).send()
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