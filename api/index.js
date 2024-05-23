const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const router = require('./routes')
const { PORT } = require('./config')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

app.use('/api/v1', router)

app.get('/test-connection', (req, res) => {
    return res.status(200).send('ok')
})

app.listen(PORT, () => {
    console.log(`Server is up and listening at port: ${PORT}`)
});
