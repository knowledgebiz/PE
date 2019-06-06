const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const EvalModelCompetency = require ('../models/evalModelCompetency')

router.get('/evalModelCompetency', async (req, res) => {

    try{
        if (!req.query.idModel && !req.query.idCompetency){

            return res.send(await EvalModelCompetency.findAll())
            
        }
        res.send(await EvalModelCompetency.findAll( {where: { [Op.or]: [ { id_evaluation_models : req.query.idModel } , 
                                             { id_competencies: req.query.idCompetency } ] }}))
    }
    catch {
        res.status(500).send()
    }
})

router.post('/evalModelCompetency', async (req, res) => {
    try {
        if (!req.query.idModel || !req.query.idCompetency) {
            return res.status(400).send('You must send both the evaluation model ID and the competency ID')
        }
        let repeat = await EvalModelCompetency.findOne( { where: { [Op.and]: [ {id_evaluation_models: req.query.idModel },
                                                             { id_competencies: req.query.idCompetency } ] } } )
        if (repeat != null) {
            return res.status(409).send('This model and competency are already linked.')
        }
        await EvalModelCompetency.create( { id_evaluation_models: req.query.idModel, id_competencies: req.query.idCompetency } )
        res.status(201).send()
    }
    catch {
        res.status(500).send()
    }
})

// router.patch('/evalModelCompetency', async (req, res) => {
//     try {
//         if (!req.query.idModel || !req.query.idCompetency) {
//             return res.status(400).send('You must send both the evaluation model ID and the competency ID')
//         }
//         let repeat = await EvalModelCompetency.findOne( { where: { [Op.and]: [ {id_evaluation_models: req.query.idModel },
//             { id_competencies: req.query.idCompetency } ] } } )

//         if (repeat != null) {
//             return res.status(409).send('This model and competency are already linked.')
//         }

//         await EvalModelCompetency.update( { id_evaluation_models: req.query.idModel, id_competencies: req.query.idCompetency }, 
//                                             { where: { id: req.query.id } })
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
        await EvalModelCompetency.destroy({ where: { [Op.and]: [ {idModel: req.query.idModel}, { idCompetency: req.query.idCompetency } ] } })
        res.status(204).send()
    }
    catch {
        res.status(500).send()
    }
})

module.exports = router