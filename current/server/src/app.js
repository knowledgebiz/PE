const express = require('express')
require('./db/connection')
require('./bootstrap')()
const routers = require('./routers')
const cors = require('cors')


const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', routers.answerTypeRouter)
app.use('/api', routers.evaluationModelRouter)
app.use('/api', routers.competencyRouter)
app.use('/api', routers.quantitativeObjectiveRouter)
app.use('/api', routers.evaluationRouter)
app.use('/api', routers.evaluationCycleRouter)
app.use('/api', routers.evalModelCompetencyRouter)
app.use('/api', routers.evalModelQuantObjectiveRouter)

app.listen(port, () => {
    console.log('Connected on port', port)
})