const User = require('../models/user')
const Lesson = require('../models/lesson')
const ApiError = require('../utils/apierror')
const checkHomeWork = async (req, res, next) => {
    const {lessonId} = req.params
    const {lesson} = req
    if (lesson.homeWork.length === 0) {
      return next(new ApiError('this lesson has no home work',6542, 400 ))
    }
    const {user} = req  
    const userHomeWork = user.startSesionTime.filter(homeWork => homeWork.lessonId.toString() === lessonId && homeWork.type === "homeWork")[0]
    const userDegree =user.exams.filter(exam => exam.lessonId.toString() === lessonId)[0]
    if(userHomeWork?.createdAt){
      const examEndTime = userExam.createdAt.getTime() + (lesson.examTimer * 1000);
      console.log('Current Time:', Date.now());
      console.log('Exam Start Time:', userExam.createdAt.getTime());
      console.log('Exam Timer (ms):', lesson.examTimer * 1000);
      console.log('Expected End Time:', examEndTime);
      console.log('Time Difference:', Date.now() - examEndTime);
      if (Date.now() > examEndTime) {
        return next(new ApiError('you already have submitted the exam before',6342, 400 ))
      }else if(Date.now() < examEndTime && !userDegree?.degree){
        req.timer = examEndTime - Date.now() 
        return next()
      }
    }
  next()
}
module.exports = { checkHomeWork }