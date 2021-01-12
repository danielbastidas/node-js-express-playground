exports.persistValidation = (req, res, next) => {

    req.check('name', 'Name is mandatory').notEmpty()
    req.check('age', 'Age is mandatory').notEmpty()

    req.check('name', 'The maximum length allowed for name is 10 characters').isLength({
        max: 10
    })

    req.check('age', 'Age should be a number from 18 to 200').isInt({
        min: 18,
        max: 200
    })

    const errors = req.validationErrors()
    if (errors) {
        return res.status(400).json({
            errors: errors.map(error => error.msg)
        })
    }

    next()
}