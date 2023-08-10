const express=require('express')
const { login, register, profile, signout, resetpassword, verifycode, forgetpassword } = require('../controllers/auth')
const { loginvalidator, registervalidator, resetpasswordvalidator } = require('../utils/validators/authvalidators')

const router = express.Router()
router.post('/login',loginvalidator,login)
router.get('/csrf',(req,res)=>{res.json({_csrf:req.csrfToken()})})
router.post('/register',registervalidator,register)
router.get('/profile',profile)
router.get('/signout',signout)
// routers for reset password
router.post('/forget-password',forgetpassword) // to send email that contain verrfication code
router.post('/verify-code',verifycode)    // to check if the reset code is valid from user
router.put('/reset-password',resetpasswordvalidator,resetpassword) // to reset password after validating reset code


module.exports=router