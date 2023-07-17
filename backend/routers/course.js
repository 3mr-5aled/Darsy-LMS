const express=require('express')
const { createCourse, updateCourse, getCourse, getAllCourses, deleteCourse } = require('../controllers/course')
const { createCourseValidator } = require('../utils/validators/coursevalidator')
const authintication = require('../middlewares/authorization')
const authintications = require('../middlewares/authintication')
const uploadImage = require('../middlewares/imageupload')

const router = express.Router()

router.post('/createcourse',authintications,authintication,createCourseValidator,uploadImage,createCourse)
router.get('/getallcourses',getAllCourses)
router.get('/getcourse/:id',getCourse)
router.put('/updatecourse/:id',authintications,authintication,updateCourse)
router.delete('/deletecourse/:id',authintications,authintication,deleteCourse)

module.exports=router