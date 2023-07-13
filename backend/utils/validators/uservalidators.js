const {check}= require('express-validator')
const User = require('../../models/user')
const usermiddleware=require('../../middlewares/validator')
const ApiError = require('../apierror')


const registervalidator=[
    check('name').notEmpty().withMessage('name is required').isLength({max:30,min:4}).withMessage("name must be between 4 and 30"),
    check('email').notEmpty().withMessage('email is required').isEmail().withMessage("invalid email address")
    .custom(async(val)=>{
        const user = await User.findOne({email:val})
        if (user) {
            throw new ApiError('this email is already taken',400)
        }
    }),
    check('password').notEmpty().withMessage('passsword is required').isLength({max:16,min:8}).withMessage("passsword must be between 8 and 16"),
    check('phone').notEmpty().withMessage('phone is required').isMobilePhone('ar-EG').withMessage('invalid phone number only egyption is accepted'),
    check('parentsPhone').notEmpty().withMessage('parentsPhone is required').isMobilePhone('ar-EG').withMessage('invalid parentsPhone number only egyption is accepted'),
    usermiddleware
]
const loginvalidator=[
    check('email').optional().isEmail().withMessage("invalid email address"),
    check('phone').optional().isMobilePhone('ar-EG').withMessage('invalid phone number only egyption is accepted'),
    check('password').notEmpty().withMessage('passsword is required'),
    usermiddleware
]
const resetpasswordvalidator=[
    check('email').notEmpty().withMessage('email is required').isEmail().withMessage("invalid email address"),
    check('password').notEmpty().withMessage('passsword is required').isLength({max:16,min:8}).withMessage("passsword must be between 8 and 16"),
    usermiddleware
]

module.exports = {registervalidator,loginvalidator,resetpasswordvalidator}