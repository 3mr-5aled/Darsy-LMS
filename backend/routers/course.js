const express=require('express')
const { createCourse, updateCourse, getCourse, getAllCourses, deleteCourse } = require('../controllers/course')
const { createCourseValidator } = require('../utils/validators/coursevalidator')
const authintication = require('../middlewares/authintication')

const router = express.Router()

router.post('/createcourse',authintication,createCourseValidator,createCourse)
router.get('/getallcourses',getAllCourses)
router.get('/getcourse/:id',getCourse)
router.put('/updatecourse/:id',authintication,updateCourse)
router.delete('/deletecourse/:id',authintication,deleteCourse)

module.exports=router