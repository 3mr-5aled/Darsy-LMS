const {check}= require('express-validator')
const validator=require('../../middlewares/validator')
const deleteUserValidator=[
    check('userId').notEmpty().withMessage('userId is required').isMongoId().withMessage('userId is invalid id'),
    validator
]
const getUserValidator=[
    check('userId').notEmpty().withMessage('userId is required').isMongoId().withMessage('userId is invalid id'),
    validator
]
const updateUserValidator=[
    check('userId').notEmpty().withMessage('userId is required').isMongoId().withMessage('userId is invalid id'),
    validator
]
module.exports={deleteUserValidator,getUserValidator,updateUserValidator}
