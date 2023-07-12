const express=require('express')
const { login, register, profile, signout } = require('../controllers/auth')

const router = express.Router()

router.post('/login',login)
router.post('/register',register)
router.get('/profile',profile)
router.get('/signout',signout)

module.exports=router