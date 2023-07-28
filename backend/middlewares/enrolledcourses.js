const User = require('../models/user')
const Lesson = require('../models/lesson')
const ApiError = require('../utils/apierror')
require('dotenv').config()
const enrolledCourse = async (req, res, next) => {
  const { user } = req
  console.log(user);
  const { lessonId } = req.params;
  const lesson = await Lesson.findById(lessonId)
  if (!lesson) {
    return next(new ApiError("no lesson is found",6341, 404));
  }
  await lesson.populate('sectionId')
  await lesson.populate('courseId')
  req.lesson = lesson
  const userFromDB = await User.findById(user._id)
  if (userFromDB.role === "tutor") {
    return next()
  }
  if (userFromDB.isMemberShip.memberId && userFromDB.isMemberShip.expiredTime > Date.now()) {
    return next()
  }
  const enrolledCourses = userFromDB.enrolledCourse.filter(course => course.courseId.toString() === lesson.courseId.toString())
  if (enrolledCourses.length === 0) {
    return next(new ApiError("you are not enrolled in this course",8364, 400));
  }
  next()
}
module.exports = { enrolledCourse }