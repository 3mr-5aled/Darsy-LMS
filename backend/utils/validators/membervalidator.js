const {check}= require('express-validator')
const validator=require('../../middlewares/validator')

const addMemberValidator=[
    check('name').notEmpty().withMessage('name is required'),
    check('grade').notEmpty().withMessage('grade is required'),
    check('expiredTime').notEmpty().withMessage('expiredTime is required'),
    check('description').notEmpty().withMessage('description is required'),
    check('price').notEmpty().withMessage('price is required'),
    validator
]
const getMemberValidator=[
    check('memberId').notEmpty().withMessage('memberId is required').isMongoId().withMessage("memberId is invalid id"),
    validator
]
const updateMemberValidator=[
    check('memberId').notEmpty().withMessage('memberId is required').isMongoId().withMessage("memberId is invalid id"),
    validator
]
const deleteMemberValidator=[
    check('memberId').notEmpty().withMessage('memberId is required').isMongoId().withMessage("memberId is invalid id"),
    validator
]
module.exports={deleteMemberValidator,updateMemberValidator,getMemberValidator,addMemberValidator}