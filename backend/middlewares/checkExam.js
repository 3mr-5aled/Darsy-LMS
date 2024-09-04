const User = require('../models/user')
const Lesson = require('../models/lesson')
const ApiError = require('../utils/apierror')
const checkExam = async (req, res, next) => {
    const {lessonId} = req.params
    const {lesson} = req
    if (lesson.exams.length === 0) {
      return next(new ApiError('this lesson has no exams',6542, 400 ))
    }
    const {user} = req  
    const userExam = user.startSesionTime.filter(exam => exam.lessonId.toString() === lessonId && exam.type === "exam")[0]
    const userDegree =user.exams.filter(exam => exam.lessonId.toString() === lessonId)[0]

    if(userExam?.createdAt){
      if (Date.now() < (userExam.createdAt.getTime() + (lesson.examTimer * 1000))) {
        return next(new ApiError('you already have submitted the exam before',6342, 400 ))
      }else if(Date.now() > (userExam.createdAt.getTime() + (lesson.examTimer * 1000)) && !userDegree?.degree){
        req.timer = Date.now() - (userExam.createdAt.getTime() + (lesson.examTimer * 1000))
        return next()
      }
    }
  next()
}
module.exports = { checkExam }