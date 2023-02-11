require('dotenv').config()
const { json } = require('express')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database..'))

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listining on port ${port}...`))