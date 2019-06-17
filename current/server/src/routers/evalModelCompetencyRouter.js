const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const EvalModelCompetency = require ('../models/evalModelCompetency')

router.get('/evalModelCompetency', async (req, res) => {

    try{
        let errMessage = 'Relation not found'
        if (!req.query.idModel && !req.query.idCompetency){
            const response = await EvalModelCompetency.findAll()
            if (response[0]){
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }
        if (req.query.idModel && req.query.idCompetency){
            const response = await EvalModelCompetency.findAll( {where: { [Op.and]: [ { id_evaluation_models : req.query.idModel } , 
                { id_competencies: req.query.idCompetency } ] } } )
            if (response[0]){
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }
        if(req.query.idModel && !req.query.idCompetency){
            const response = await EvalModelCompetency.findAll( { where: { id_evaluation_models: req.query.idModel } } )
            if (response[0]){
                return res.send(response)
            }
            return res.status(404).send(errMessage)
        }
        const response = await EvalModelCompetency.findAll( { where: { id_competencies: req.query.idCompetency } } )
        if (response[0]){
            return res.send(response)
        }
        res.status(404).send(errMessage)
    }
    catch {
        res.status(500).send()
    }
})

router.post('/evalModelCompetency', async (req, res) => {
    try {
        if (!req.body.idModel || !req.body.idCompetency) {
            return res.status(400).send('You must send both the evaluation model ID and the competency ID')
        }
        let repeat = await EvalModelCompetency.findOne( { where: { [Op.and]: {id_evaluation_models: req.body.idModel, 
                                                            id_competencies: req.body.idCompetency } } } )

        if (repeat != null) {
            return res.status(409).send('This model and competency are already linked.')
        }
        await EvalModelCompetency.create( { id_evaluation_models: req.body.idModel, id_competencies: req.body.idCompetency } )
        res.status(201).send()
    }
    catch (e) {
        if(!e.original){
            res.status(500).send('An internal error has occurred')
        }
        if (e.original.errno == 1452){
            res.status(404).send('Model or competency not found')
        }
        res.status(500).send()
    }
})

// router.patch('/evalModelCompetency', async (req, res) => {
//     try {
//         if (!req.body.idModel || !req.body.idCompetency) {
//             return res.status(400).send('You must send both the evaluation model ID and the competency ID')
//         }
//         let repeat = await EvalModelCompetency.findOne( { where: { [Op.and]: [ {id_evaluation_models: req.body.idModel },
//             { id_competencies: req.body.idCompetency } ] } } )

//         if (repeat != null) {
//             return res.status(409).send('This model and competency are already linked.')
//         }

//         await EvalModelCompetency.update( { id_evaluation_models: req.body.idModel, id_competencies: req.body.idCompetency }, 
//                                             { where: { id: req.body.id } })
//         res.send()
//     }
//     catch {
//         res.status(500).send()
//     }
// })

router.delete('/evalModelCompetency', async (req, res) => {
    try {
        if (!req.query.idModel || !req.query.idCompetency) {
            return res.status(400).send('You must send both the ID of the model and competency to delete the relation between them')
        }
        await EvalModelCompetency.destroy({ where: { [Op.and]: [ {id_evaluation_models: req.query.idModel}, { id_competencies: req.query.idCompetency } ] } })
        res.status(204).send()
    }
    catch (e){
        res.status(500).send(e)
    }
})

module.exports = router