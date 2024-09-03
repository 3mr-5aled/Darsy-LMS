const User = require('../models/user')
const Lesson = require('../models/lesson')
const ApiError = require('../utils/apierror')
const checkExam = async (req, res, next) => {
    const {lessonId} = req.params
    const {lesson} = req
    if (lesson.homeWork.length === 0) {
      return next(new ApiError('this lesson has no home work',6542, 400 ))
    }
    const {user} = req  
    const userHomeWork = user.startSesionTime.filter(homeWork => homeWork.lessonId.toString() === lessonId && homeWork.type === "homeWork")[0]
    // add exam session timer here
    if(userHomeWork.createdAt && new Date.now() > (userHomeWork.createdAt.getTime() + lesson.homeWorkTimer)){
        return next(new ApiError('you already have submitted the exam before',6342, 400 ))
    }
  next()
}
module.exports = { checkHomeWork }