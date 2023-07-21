const express=require('express')
const { getAllUsers,updateUser } = require('../controllers/user')
const authintication = require('../middlewares/authorization')
const authintications = require('../middlewares/authintication')
const router = express.Router()

router.get('/getallusers',authintications,authintication,getAllUsers)
router.put('/updateuser/:userId',authintications,authintication,updateUser)

module.exports=router