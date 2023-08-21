const {check}= require('express-validator')
const User = require('../../models/user')
const Owner = require('../../models/owner')
const ownermiddleware=require('../../middlewares/validator')
const ApiError = require('../apierror')

const registervalidator=[
    check('name').notEmpty().withMessage('name is required').isLength({max:30,min:4}).withMessage("name must be between 4 and 30")
    .custom(async(val)=>{
        const user = await User.findOne({name:val})
        const owner = await Owner.findOne({name:val})
        if (user || owner) {
            throw new ApiError('this username is already taken',400)
        }
    }),
    check('logo').notEmpty().withMessage('logo is required').withMessage("logo must be between 4 and 30"),
    check('email').notEmpty().withMessage('email is required').isEmail().withMessage("invalid email address")
    .custom(async(val)=>{
        const user = await User.findOne({email:val})
        const owner = await User.findOne({email:val})
        if (user || owner) {
            throw new ApiError('this email is already taken',400)
        }
    }),
    check('password').notEmpty().withMessage('passsword is required').isLength({max:16,min:8}).withMessage("passsword must be between 8 and 16"),
    check('phone').notEmpty().withMessage('phone is required').isMobilePhone('ar-EG').withMessage('invalid phone number only egyption is accepted'),
    ownermiddleware
]
module.exports = {registervalidator}