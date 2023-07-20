const User = require('../models/user')
const Lesson = require('../models/lesson')
const ApiError = require('../utils/apierror')
require('dotenv').config()
const authintication =async(req,res,next)=>{
    const {user} = req 
    const { lessonId } = req.params;
    const lesson = await Lesson.findById(lessonId)
    if (!lesson ) {
      return next(new ApiError("no lesson is found", 404));
    }
    const userFromDB = await User.findById(user._id)
    const enrolledCourses = userFromDB.enrolledCourse.filter(course => course.courseid === lesson.courseId)
    if (enrolledCourses.length === 0) {
      return next(new ApiError("you are not enrolled in this course", 400));
    }
    req.lesson = lesson
    next()
}
module.exports=authintication