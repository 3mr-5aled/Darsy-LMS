const User = require('../models/user')
const Lesson = require('../models/lesson')
const ApiError = require('../utils/apierror')
require('dotenv').config()
const enrolledCourse = async (req, res, next) => {
  const { user } = req
  const { lessonId } = req.params;
  const lesson = await Lesson.findById(lessonId)
  if (!lesson) {
    return next(new ApiError("no lesson is found", 6341, 404));
  }
  if (userFromDB.role === "tutor") {
    return next()
  }
  const enrolledCourses = userFromDB.enrolledCourse.filter(course => course.courseId.toString() === lesson.courseId._id.toString())
  if (enrolledCourses.length === 0) {
    return next(new ApiError("you are not enrolled in this course", 8364, 400));
  }
  await lesson.populate('sectionId')
  await lesson.populate('courseId')
  req.lesson = lesson
  const userFromDB = await User.findById(user._id)
  if (userFromDB.role !== "tutor" || userFromDB.role === "owner") {
    userFromDB.enrolledCourse.map((course) => {
      if (lesson.courseId._id.toString() === course.courseId.toString()) {
        course.lastSignedInCourse = Date.now()
        return course
      }
      else {
        return course
      }
    })
    await userFromDB.save()

    return next()
  }
  const {views} = userFromDB.enrolledCourse
  .map(course => {
    if (course.courseId.toString() === lesson.courseId._id.toString()) {
      console.log('in');
      const foundLesson = course.lessons.find(lesson => lesson.lessonId.toString() === lessonId);
      return foundLesson;
    }
    return undefined; // Return undefined if the course doesn't match
  })
  .find(lesson => lesson !== undefined); 
  console.log(views);
  if (views === 0) {
    return next(new ApiError("you have already finished this lesson views", 8364, 400));
  }
  if (userFromDB.memberShip.memberId && userFromDB.memberShip.expiredTime > Date.now() && lesson.courseId.grade === userFromDB.grade) {
    userFromDB.enrolledCourse.map((course) => {
      if (lesson.courseId._id.toString() === course.courseId.toString()) {
        course.lastSignedInCourse = Date.now()
        const lessons = course.lessons.map((lesson) => {
          if (lesson.lessonId.toString() === lessonId) {
            console.log(lesson)
            lesson.views = lesson.views - 1
            return lesson
          }else {
            return lesson
          }
        })
        course.lessons = lessons
        return course
      }
      else {
        return course
      }
    })
    await userFromDB.save()
    return next()
  }
  userFromDB.enrolledCourse.map((course) => {
    if (lesson.courseId._id.toString() === course.courseId.toString()) {
      course.lastSignedInCourse = Date.now()
      const lessons = course.lessons.map((lesson) => {
        if (lesson.lessonId.toString() === lessonId) {
          console.log(lesson)
          lesson.views = lesson.views - 1
          return lesson
        }else {
          return lesson
        }
      })
      course.lessons = lessons
      return course
    }
    else {
      return course
    }
  })
  await userFromDB.save()
  return next()
}
module.exports = { enrolledCourse }