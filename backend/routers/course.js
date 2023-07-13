const express=require('express')
const { createCourse } = require('../controllers/course')
const { createCourseValidator } = require('../utils/validators/coursevalidator')

const router = express.Router()

router.post('/createcourse',createCourseValidator,createCourse)

module.exports=router