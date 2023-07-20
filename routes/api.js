const express = require('express')
const route = express.Router()
const { login, registration } = require('./../controllers/AuthController')
const { JWTValidator } = require('../middleware/JWTValidatorMiddleware')

//Open routes
route.post('/login', login)
route.post('/register', registration)

//JWT token protected routes
route.use(JWTValidator)


module.exports = route