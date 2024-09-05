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
    const userDegree =user.exams.filter(exam => exam.lessonId.toString() === lessonId)[0]
    if(userHomeWork?.createdAt){
      if (Date.now() > (userHomeWork.createdAt.getTime() + (lesson.homeWorkTimer * 1000))) {
        return next(new ApiError('you already have submitted the exam before',6342, 400 ))
      }else if(Date.now() < (userHomeWork.createdAt.getTime() + (lesson.homeWorkTimer * 1000)) && !userDegree?.degree){
        req.timer = (userHomeWork.createdAt.getTime() + (lesson.homeWorkTimer * 1000)) - Date.now() 
        return next()
      }
    }
  next()
}
module.exports = { checkHomeWork }