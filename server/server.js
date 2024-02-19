const http = require("http")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const sequelize = require("./utils/database")
const app = express()
const User = require('./modals/user')
const Transaction = require('./modals/transaction')
const userRoutes = require("./routes/user")
const TransactionRoutes = require("./routes/transaction")
app.use(bodyParser.json())
app.use(cors())
app.use(userRoutes)
app.use(TransactionRoutes)
app.use(User)
app.use(Transaction)




const server = http.createServer(app).listen(4000)
sequelize
    .sync()
    .then(() => {
        server
        console.log("connected successfully")

    }).catch((err) => {
        console.log(err)
    })