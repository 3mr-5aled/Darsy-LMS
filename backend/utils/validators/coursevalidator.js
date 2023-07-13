const {check}= require('express-validator')
const validator=require('../../middlewares/validator')

const createCourseValidator=[
    check('name').notEmpty().withMessage('name is required'),
    check('description').notEmpty().withMessage('description is required'),
    check('courseImg').notEmpty().withMessage('courseImg is required'),
    check('duration').notEmpty().withMessage('duration is required'),
    check('price').notEmpty().withMessage('price is required'),
    check('language').notEmpty().withMessage('language is required'),
    check('total').notEmpty().withMessage('total is required'),
    validator
]
module.exports={createCourseValidator}