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
        res.send(await EvalModelQuantObjective.findAll( {where: { [Op.or]: [ { id_evaluation_models : req.query.idModel } , 
                                             { id_quantitative_objectives: req.query.idObjective } ] }}))
    }
    catch {
        res.status(500).send()
    }
})

router.post('/evalModelQuantObjective', async (req, res) => {
    try {
        if (!req.query.idModel || !req.query.idObjective) {
            return res.status(400).send('You must send both the evaluation model ID and the objective ID')
        }
        let repeat = await EvalModelQuantObjective.findOne( { where: { [Op.and]: [ {id_evaluation_models: req.query.idModel },
                                                             { id_quantitative_objectives: req.query.idObjective } ] } } )
        if (repeat != null) {
            return res.status(409).send('This model and objective are already linked.')
        }
        await EvalModelQuantObjective.create( { id_evaluation_models: req.query.idModel, id_quantitative_objectives: req.query.idObjective } )
        res.status(201).send()
    }
    catch {
        res.status(500).send()
    }
})

// router.patch('/evalModelQuantObjective', async (req, res) => {
//     try {
//         if (!req.query.idModel || !req.query.idObjective) {
//             return res.status(400).send('You must send both the evaluation model ID and the objective ID')
//         }
//         let repeat = await EvalModelQuantObjective.findOne( { where: { [Op.and]: [ {id_evaluation_models: req.query.idModel },
//             { id_quantitative_objectives: req.query.idObjective } ] } } )

//         if (repeat != null) {
//             return res.status(409).send('This model and objective are already linked.')
//         }

//         await EvalModelQuantObjective.update( { id_evaluation_models: req.query.idModel, id_quantitative_objectives: req.query.idObjective }, 
//                                             { where: { id: req.query.id } })
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
        await EvalModelQuantObjective.destroy({ where: { [Op.and]: [ {idModel: req.query.idModel}, { idObjective: req.query.idObjective } ] } })
        res.status(204).send()
    }
    catch {
        res.status(500).send()
    }
})

module.exports = router