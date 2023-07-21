const express = require('express')
const route = express.Router()
const { login, registration } = require('./../controllers/AuthController')
const { JWTValidator } = require('../middleware/JWTValidatorMiddleware')
const { RegistrationValidator } = require('../validators/RegistrationValidation')
const { ValidationErrorHandlerMiddleware } = require('../middleware/ValidationErrorHandlerMiddleware')

//Open routes
route.post('/login', login)
route.post('/register', RegistrationValidator, ValidationErrorHandlerMiddleware, registration)

//JWT token protected routes
route.use(JWTValidator)


module.exports = route