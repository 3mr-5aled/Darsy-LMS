const User = require('../models/user')
const Lesson = require('../models/lesson')
const ApiError = require('../utils/apierror')
require('dotenv').config()
const enrolledCourse = async (req, res, next) => {
  const { user } = req

  const { lessonId } = req.params;
  const lesson = await Lesson.findById(lessonId).select('-video.src')
  if (!lesson) {
    return next(new ApiError("no lesson is found", 6341, 404));
  }
  await lesson.populate('sectionId')
  await lesson.populate('courseId')
  req.lesson = lesson
  const userFromDB = await User.findById(user._id)
  if (userFromDB.role === "tutor" || userFromDB.role === "owner") {
    userFromDB.enrolledCourse.map((course) =>{ 
      console.log(course);
      if(lesson.courseId._id.toString() === course.courseId.toString())
      { 
        course.lastSignedInCourse = Date.now()
        return course
    }
    else{
      return course
    }})
    await userFromDB.save()

    return next()
  }
  if (userFromDB.memberShip.memberId && userFromDB.memberShip.expiredTime > Date.now() && lesson.courseId.grade === userFromDB.grade ) {
    userFromDB.enrolledCourse.map((course) =>{ 
      console.log(course);
      if(lesson.courseId._id.toString() === course.courseId.toString())
      { 
        course.lastSignedInCourse = Date.now()
        return course
    }
    else{
      return course
    }})
        await userFromDB.save()
    return next()
  }
  const enrolledCourses = userFromDB.enrolledCourse.filter(course => course.courseId.toString() === lesson.courseId._id.toString())
  if (enrolledCourses.length === 0) {
    return next(new ApiError("you are not enrolled in this course", 8364, 400));
  }
  userFromDB.enrolledCourse.map((course) =>{ 
    if(lesson.courseId._id.toString() === course.courseId.toString())
    { 
      course.lastSignedInCourse = Date.now()
      return course
  }
  else{
    return course
  }})
  await userFromDB.save()
  next()
}
module.exports = { enrolledCourse }