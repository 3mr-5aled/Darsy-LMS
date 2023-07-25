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
const addCourseToUserValidator=[
    check('userId').notEmpty().withMessage('userId is required').isMongoId().withMessage('userId is invalid id'),
    check('amount').notEmpty().withMessage('amount is required').isNumeric().withMessage('amount must be string of number'),
    check('courseId').notEmpty().withMessage('courseId is required').isMongoId().withMessage('courseId is invalid id'),
    validator
]
const removeUserFromCourseValidator=[
    check('userId').notEmpty().withMessage('userId is required').isMongoId().withMessage('userId is invalid id'),
    check('courseId').notEmpty().withMessage('courseId is required').isMongoId().withMessage('courseId is invalid id'),
    validator
]
module.exports={deleteUserValidator,getUserValidator,updateUserValidator,addCourseToUserValidator,removeUserFromCourseValidator}
