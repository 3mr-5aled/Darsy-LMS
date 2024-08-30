const aynchandler = require("express-async-handler")
const Course = require("../models/course")
const User = require("../models/user")
const ApiError = require("../utils/apierror")
const slugify = require("slugify")
const createCourse = aynchandler(async (req, res, next) => {
  // @api   post api/v1/course/create-course
  //  you will send name ,description,duration,price,(discount => (optional)) in body
  const { body } = req
  body.slug = slugify(body.name, { lower: true });
  let appearanceDate = Date.parse(body.appearanceDate);
  const course = await Course.create({ ...body, appearanceDate })
  // image must be base 64 to upload on cloudinary
  res.status(200).json(course)
  //  you will recieve course object
})
const updateCourse = aynchandler(async (req, res, next) => {
  // @api   put api/v1/course/update-course/:id
  // you will send data to update in  body and id as params
  const { body } = req
  const { id } = req.params
  const course = await Course.findByIdAndUpdate(id, { ...body }, { new: true })
  if (!course) {
    return next(new ApiError("no course found to updated", 8341, 404))
  }
  res.status(200).json(course)
  // you recieve the new course object
})
const getAllCourses = aynchandler(async (req, res, next) => {
  // @api   get api/v1/course/getallcourses
  const { grade } = req.params
  const course =
    grade === "all" ? await Course.find({}) : await Course.find({ grade })
  if (course.length === 0) {
    return next(new ApiError("no courses are found", 8341, 404))
  }
  const courses = course.map((oneCourse) => {
    if (oneCourse.appearanceDate < Date.now()) {
      oneCourse.isShown = true
      return oneCourse
    } else {
      oneCourse.isShown = false
      return oneCourse
    }
  })
  res.status(200).json(courses)
})
const getCourse = aynchandler(async (req, res, next) => {
  // @api   get api/v1/course/get-course/:id
  //  send id as params
  const { id } = req.params
  const course = await Course.findById(id).populate("sections")
  if (!course) {
    return next(new ApiError("no course with this id", 8341, 400))
  } else if (course.appearanceDate > Date.now()) {
    next(new ApiError("Course isn't launched yet", 8342, 400))
  }
  res.status(200).json(course)
  // get specific course
})
const deleteCourse = aynchandler(async (req, res, next) => {
  // @api   delete api/v1/course/delete-course/:id
  //  send id as params
  const { id } = req.params
  const course = await Course.findOneAndDelete({ _id: id })
  if (!course) {
    return next(new ApiError("no course with this id", 8341, 400))
  }
  await User.updateMany(
    { "enrolledCourse.courseId": course._id },
    { $pull: { enrolledCourse: { courseId: course._id } } }
  )
  res.status(200).json({ msg: "course is deleted" })

  // recieve {msg:'course is deleted'} if course is deleted
})
module.exports = {
  createCourse,
  updateCourse,
  getCourse,
  getAllCourses,
  deleteCourse,
}
