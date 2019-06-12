const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const EvalModelQuantObjective = require ('../models/evalModelQuantObjective')

router.get('/evalModelQuantObjective', async (req, res) => {

    try{
        if (!req.query.idModel && !req.query.idObjective){
            return res.send(await EvalModelQuantObjective.findAll())
        }
        if (req.query.idModel && req.query.idObjective){
            return res.send(await EvalModelQuantObjective.findAll( {where: { [Op.and]: [ { id_evaluation_models : req.query.idModel } , 
                                                                { id_quantitative_objectives: req.query.idObjective } ] } } ))
        }
        if(req.query.idModel && !req.query.idObjective){
            return res.send(await EvalModelQuantObjective.findAll( { where: { id_evaluation_models: req.query.idModel } } ))
        }
        res.send(await EvalModelQuantObjective.findAll( { where: { id_quantitative_objectives: req.query.idObjective } } ))
    }
    catch {
        res.status(500).send()
    }
})

router.post('/evalModelQuantObjective', async (req, res) => {
    try {
        if (!req.body.idModel || !req.body.idObjective) {
            return res.status(400).send('You must send both the evaluation model ID and the objective ID')
        }
        let repeat = await EvalModelQuantObjective.findOne( { where: { [Op.and]: [ {id_evaluation_models: req.body.idModel },
                                                             { id_quantitative_objectives: req.body.idObjective } ] } } )
        if (repeat != null) {
            return res.status(409).send('This model and objective are already linked.')
        }
        
        await EvalModelQuantObjective.create( { id_evaluation_models: req.body.idModel, id_quantitative_objectives: req.body.idObjective } )
        res.status(201).send()
    }
    catch (e) {
        if(!e.original){
            res.status(500).send('An internal error has occurred')
        }
        if (e.original.errno == 1452){
            res.status(404).send('Model or objective not found')
        }
        res.status(500).send('An error has occurred')
    }
})

// router.patch('/evalModelQuantObjective', async (req, res) => {
//     try {
//         if (!req.body.idModel || !req.body.idObjective) {
//             return res.status(400).send('You must send both the evaluation model ID and the objective ID')
//         }
//         let repeat = await EvalModelQuantObjective.findOne( { where: { [Op.and]: [ {id_evaluation_models: req.body.idModel },
//             { id_quantitative_objectives: req.body.idObjective } ] } } )

//         if (repeat != null) {
//             return res.status(409).send('This model and objective are already linked.')
//         }

//         await EvalModelQuantObjective.update( { id_evaluation_models: req.body.idModel, id_quantitative_objectives: req.body.idObjective }, 
//                                             { where: { id: req.body.id } })
//         res.send()
//     }
//     catch {
//         res.status(500).send()
//     }
// })

router.delete('/evalModelQuantObjective', async (req, res) => {
    try {
        if (!req.query.idModel || !req.query.idObjective) {
            return res.status(400).send('You must send both the ID of the model and objective to delete the relation between them')
        }
        await EvalModelQuantObjective.destroy({ where: { [Op.and]: [ {id_evaluation_models: req.query.idModel}, { id_quantitative_objectives: req.query.idObjective } ] } })
        res.status(204).send()
    }
    catch {
        res.status(500).send()
    }
})

module.exports = router