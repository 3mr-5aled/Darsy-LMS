const express=require('express')
const { createCourse, updateCourse, getCourse, getAllCourses, deleteCourse, getAllCoursesByGrade } = require('../controllers/course')
const { createCourseValidator } = require('../utils/validators/coursevalidator')
const authintication = require('../middlewares/authorization')
const authintications = require('../middlewares/authintication')
const uploadImage = require('../middlewares/imageupload')

const router = express.Router()
router.post('/create-course',authintications,authintication,createCourseValidator,createCourse)
router.get('/get-all-courses/:grade',getAllCourses)
router.get('/get-course/:id',getCourse)
router.put('/update-course/:id',authintications,authintication,updateCourse)
router.delete('/delete-course/:id',authintications,authintication,deleteCourse)

module.exports=router