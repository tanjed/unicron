const { check } = require("express-validator");
const User = require("../models/User")

exports.RegistrationValidator = [
    check('first_name').not().isEmpty().withMessage('First name is required').trim(),
    check('last_name').not().isEmpty().withMessage('Last name is required').trim(),
    
    check('mobile')
    .not()
    .isEmpty()
    .withMessage('Mobile number is required')
    .matches(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/)
    .withMessage('Mobile number must be valid')
    .custom(async(mobile) => {
        const user = await User.findOne({mobile : mobile})
        if (user) {
            throw new Error('Mobile already taken')
        }
    }).trim(),

    check('email')
    .isEmail()
    .withMessage('Email must be valid')
    .custom(async(email) => {
        const user = await User.findOne({email : email})
        if (user) {
            throw new Error('Email already taken')
        }
    }).trim(),

    check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .isLength({min : 6})
    .withMessage('Password must be 6 char long'),
]