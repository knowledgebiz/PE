const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Competency = require ('../models/competency')
const Relation = require ('../models/evalModelCompetency')

router.get('/competency/form', async (req, res) => {
    try{
        // const response = await Competency.findAll({
        //     include: [
        //         model: Relation
        //     ]
        // })
        const response = await sequelize.query(`select competency, emc.id_competencies from competencies inner join eval_models_has_competencies as emc on emc.id_competencies = competencies.id inner join evaluation_models as em on em.id = emc.id_evaluation_models where em.id = ${req.query.id} order by emc.id_competencies`, { type: Sequelize.QueryTypes.SELECT })
        return res.send(response)
    }
    catch{
        console.log('erro')
        res.status(500).send()
    }
})

router.get('/competency', async (req, res) => {

    try{
        const errMessage = 'Competency not found.'
        if (!req.query.competency && !req.query.id){
            const response = await Competency.findAll( { order: [['id', 'asc' ]]  } )
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
        const response = await Competency.findAll( {where: { competency : { [Op.like]: '%'+req.query.competency+'%' } } } )
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
        console.log(req.body)
        if (!req.body.competency) {
            return res.status(400).send('Error: Competency has not been sent.')
        }
        const comp = await Competency.create({
            competency: req.body.competency
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
        res.status(500).send('An internal error has occurred.')
        
    }
})

router.patch('/competency', async (req, res) => {
    try {
        if (!req.body.competency || !req.body.id) {
            return res.status(400).send('You must send the ID of the competency and its new value.')
        }
        await Competency.update({ competency: req.body.competency }, { where: {id: req.body.id } })
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