const { validationResult } = require("express-validator")

exports.ValidationErrorHandlerMiddleware = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({
            success : false,
            errors : errors.mapped()
        })
    }

    next()
}