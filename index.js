require("dotenv").config();
const express = require("express");
const sequelize= require("./db")
const models = require("./models/models")
const path = require("path")
const fileUpload = require('express-fileupload')
const errorHandler = require("./middlewares/errorMiddleware")
const cors = require("cors");
const router =  require("./routes/index")
const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,"../build", 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,() => console.log("Server started on PORT " + PORT))
    } catch (e) {
        console.log(e)
    }
}

start()