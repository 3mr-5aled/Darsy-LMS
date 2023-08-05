const {check}= require('express-validator')
const validator=require('../../middlewares/validator')
const createOrderValidator=[
    check('courseId').notEmpty().withMessage('courseId is required').isMongoId().withMessage('courseId is invalid id'),
    validator
]
module.exports={createOrderValidator}