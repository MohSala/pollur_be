const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
    return [
        // username must be an email
        body('fullName').notEmpty(),
        body('fullName').isLength({ min: 3 }),
        body('email').isEmail(),
        body('email').notEmpty(),
        body('password').notEmpty(),
        // password must be at least 5 chars long
        body('password').isLength({ min: 5 }),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

export {
    userValidationRules,
    validate,
}