const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 6000
const { MONGOURI } = require('./keys')

require("./models/user")
require("./models/post")

app.use(express.json())

app.use(require('./routes/auth'))
app.use(require('./routes/post'))

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("connected to mongo yeah")
})
mongoose.connection.on("error", (err) => {
    console.log("Error connected to mongo", err)
})

app.listen(PORT, () => {
    console.log("Server is running on:", PORT)
})