const express=require('express')
const { login, register, profile, signout, resetpassword, verifycode, forgetpassword } = require('../controllers/auth')

const router = express.Router()

router.post('/login',login)
router.post('/register',register)
router.get('/profile',profile)
router.get('/signout',signout)
// routers for reset password
router.post('/forgetpassword',forgetpassword) // to send email that contain verrfication code
router.post('/verifycode',verifycode)    // to check if the reset code is valid from user
router.put('/resetpassword',resetpassword) // to reset password after validating reset code


module.exports=router