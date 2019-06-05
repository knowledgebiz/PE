const express = require('express')
require('./db/connection')
require('./bootstrap')()
const answerTypeRouter = require('./routers/answerType')
const evaluationModelRouter = require('./routers/evaluationModel')
const competencyRouter = require('./routers/competency')
const quantitativeObjectiveRouter = require('./routers/quantitativeObjective')
const evaluationRouter = require('./routers/evaluation')
const cors = require('cors')


const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', answerTypeRouter)
app.use('/api', evaluationModelRouter)
app.use('/api', competencyRouter)
app.use('/api', quantitativeObjectiveRouter)
app.use('/api', evaluationRouter)

app.listen(port, () => {
    console.log('Connected on port', port)
})