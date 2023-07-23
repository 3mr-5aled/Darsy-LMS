const User = require('../models/user')
const Lesson = require('../models/lesson')
const ApiError = require('../utils/apierror')
require('dotenv').config()
const enrolledCourse = async (req, res, next) => {
  const { user } = req
  const { lessonId } = req.params;
  const lesson = await Lesson.findById(lessonId)
  if (!lesson) {
    return next(new ApiError("no lesson is found", 404));
  }
  const userFromDB = await User.findById(user._id)
  const enrolledCourses = userFromDB.enrolledCourse.filter(course => course.courseId.toString() === lesson.courseId.toString())
  if (enrolledCourses.length === 0) {
    // return next(new ApiError("you are not enrolled in this course", 400));
    return res.status(200).json({errorCode : 8364})
  }
  await lesson.populate('sectionId')
  await lesson.populate('courseId')
  req.lesson = lesson
  next()
}
module.exports = { enrolledCourse }