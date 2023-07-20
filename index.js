const express = require('express')
const mongoose = require('mongoose');
const path = require('path')
const app = express()
require('dotenv').config()

const { RouteNotFoundMiddleware } = require('./middleware/RouteNotFoundMiddleware')
const { ErrorHandlerMiddleware } = require('./middleware/ErrorHandlerMiddleware')
const route = require('./routes/api')

//DB Connection
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {console.log('DB connected successfully')})
.catch((err) => {console.log(err)})

//Request Parser Registration
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

//Asset Dir Registration 
app.use(express.static(path.join(__dirname, 'public')))

 

//Route Registration
app.use('/api/v1',route)

//Handler Middleware
app.use(RouteNotFoundMiddleware)
app.use(ErrorHandlerMiddleware)

//Server Startup
app.listen(process.env.APP_PORT, () => {
    console.log(`App is listening to port ${process.env.APP_PORT}`);
})