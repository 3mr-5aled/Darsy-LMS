const User = require('../models/user')
const Lesson = require('../models/lesson')
const ApiError = require('../utils/apierror')
const checkExam = async (req, res, next) => {
  const { lessonId } = req.params
  const { lesson } = req
  if (lesson.exams.length === 0) {
    return next(new ApiError('this lesson has no exams', 6542, 400))
  }
  const { user } = req
  const userExam = await user.startSesionTime.filter(exam => exam.lessonId.toString() === lessonId && exam.type === "exam")[0]
  const userDegree = user.exams.filter(exam => exam.lessonId.toString() === lessonId)[0]

  if (userExam?.createdAt) {
    const examEndTime = userExam.createdAt.getTime() + (lesson.examTimer * 1000);
    console.log(Date.now().toLocaleString())
    console.log('Current Time:', Date.now());
    console.log('Exam Start Time:', userExam.createdAt.getTime());
    console.log('Exam Timer (ms):', lesson.examTimer * 1000);
    console.log('Expected End Time:', examEndTime);
    console.log('Time Difference:', Date.now() - examEndTime);
    if (Date.now() > examEndTime) {
      return next(new ApiError('you have already submitted the exam before', 6342, 400))
    } else if (Date.now() < examEndTime && !userDegree?.degree) {
      req.timer = examEndTime - Date.now()
      return next()
    }
  }
  next()
}
module.exports = { checkExam }