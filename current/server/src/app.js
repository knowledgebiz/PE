const express = require('express')
require('./db/connection')
require('./bootstrap')()
const answerTypeRouter = require('./routers/answerTypeRouter')
const evaluationModelRouter = require('./routers/evaluationModelRouter')
const competencyRouter = require('./routers/competencyRouter')
const quantitativeObjectiveRouter = require('./routers/quantitativeObjectiveRouter')
const evaluationRouter = require('./routers/evaluationRouter')
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