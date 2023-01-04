const connectToMongo = require('./config/database')

connectToMongo();

const express = require('express')
const app = express()
const port = 4000

app.use(express.json())
app.use('/api',require("./Routes/auth"))
app.use('/api',require("./Routes/todos"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})