const {check}= require('express-validator')
const validator=require('../../middlewares/validator')

const createCourseValidator=[
    check('name').notEmpty().withMessage('Name is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('image').notEmpty().withMessage('Image is required'),
    check('price').notEmpty().withMessage('Price is required'),
    validator
]
module.exports={createCourseValidator}