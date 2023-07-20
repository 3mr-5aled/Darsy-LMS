const {check}= require('express-validator')
const validator=require('../../middlewares/validator')
const createOrderValidator=[
    check('courseId').notEmpty().withMessage('courseId is required').isMongoId().withMessage('courseId is invalid id'),
    check('address').notEmpty().withMessage('address is required'),
    validator
]
module.exports={createOrderValidator}