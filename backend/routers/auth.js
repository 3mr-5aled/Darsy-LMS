const express=require('express')
const { login, register, profile } = require('../controllers/auth')

const router = express.Router()

router.post('/login',login)
router.post('/register',register)
router.get('/profile',profile)

module.exports=router