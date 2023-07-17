const {check}= require('express-validator')
const validator=require('../../middlewares/validator')

const createCourseValidator=[
    check('name').notEmpty().withMessage('name is required'),
    check('description').notEmpty().withMessage('description is required'),
    check('image').notEmpty().withMessage('image is required'),
    check('price').notEmpty().withMessage('price is required'),
    validator
]
module.exports={createCourseValidator}