const express=require('express')
const { getAllUsers,updateUser, deleteUser, getUser, addCourseToUser, removeUserFromCourse } = require('../controllers/user')
const authintication = require('../middlewares/authorization')
const authintications = require('../middlewares/authintication')
const { updateUserValidator, deleteUserValidator, getUserValidator, addCourseToUserValidator, removeUserFromCourseValidator } = require('../utils/validators/uservaalidator')
const router = express.Router()

router.get('/get-all-users',authintications,authintication,getAllUsers)
router.put('/update-user/:userId',authintications,authintication,updateUserValidator,updateUser)
router.put('/add-course-to-user/:userId',authintications,authintication,addCourseToUserValidator,addCourseToUser)
router.put('/remove-user-from-course/:userId',authintications,authintication,removeUserFromCourseValidator,removeUserFromCourse)
router.delete('/delete-user/:userId',authintications,authintication,deleteUserValidator,deleteUser)
router.get('/get-user/:userId',authintications,authintication,getUserValidator,getUser)

module.exports=router