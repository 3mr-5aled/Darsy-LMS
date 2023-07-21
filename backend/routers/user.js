const express=require('express')
const { getAllUsers,updateUser, deleteUser, getUser } = require('../controllers/user')
const authintication = require('../middlewares/authorization')
const authintications = require('../middlewares/authintication')
const { updateUserValidator, deleteUserValidator, getUserValidator } = require('../utils/validators/uservaalidator')
const router = express.Router()

router.get('/getallusers',authintications,authintication,getAllUsers)
router.put('/updateuser/:userId',authintications,authintication,updateUserValidator,updateUser)
router.delete('/deleteuser/:userId',authintications,authintication,deleteUserValidator,deleteUser)
router.get('/getuser/:userId',authintications,authintication,getUserValidator,getUser)

module.exports=router