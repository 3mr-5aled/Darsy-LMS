const aynchandler = require('express-async-handler')
const Lesson = require('../models/lesson')
const User = require('../models/user')
const ApiError = require('../utils/apierror')
const sendemail = require('../utils/sendemail')

const createExam = aynchandler(async (req, res, next) => {
    // @api   post api/v1/exam/:lessonId/add-exam
    // you will send lessonId in params and exam object of array in body
    const lesson = await Lesson.findById(req.params.lessonId)
    if (!lesson) {
        return next(new ApiError('lesson not found', 6341, 404))
    }
    const { body } = req
    lesson.exams = [...body]
    await lesson.save()
    const enrolledUsers = await User.find({ ['enrolledCourse.courseId']: lesson.courseId })
    enrolledUsers.map(async (user) => {
        const options = {
            email: user.email,
            message: `new exam was added seconds ago `,
            text: `new exam was added in ${lesson.title} lesson \n hurry to solve the exam`,
            name:user.name
        }
        await sendemail(options)
    })
    res.status(200).json(lesson.exams)
    //  you will recieve new lesson object
})
const getExam = aynchandler(async (req, res, next) => {
    // @api   get api/v1/exam/:lessonId/get-exam
    const exam = req.lesson.exams
    const title = req.lesson.title
    if (!exam) {
        return next(new ApiError('exam not found', 6141, 404))
    }
    res.status(200).json({ exam, title })
    //  you will recieve new lesson object
})
const addExamDegree = aynchandler(async (req, res, next) => {
    const { exam } = req.body
    const { lessonId } = req.params
    const lesson = await Lesson.findById(lessonId)
    if (!lesson) {
        return next(new ApiError('lesson not found', 6141, 404))
    }
    const user = await User.findById(req.user._id)
    let degree = 0
    console.log(exam)
    exam.map(item => {
        if (item.isCheckBoxQuiz) {
            const correct = item.selectedAnswer.map(answer => item.correctAnswer.includes(answer) ? true : false)
            const trueAnswers = correct.filter(item => item === true)
            degree = degree + (trueAnswers.length / item.correctAnswer.length)
        }
        else {
            if (item.selectedAnswer[0] === item.correctAnswer[0]) {
                degree++
            }
        }
        return degree
    })
   const lessonExam = lesson.exams.map(singleExam =>{
        const filteredExam = exam.filter( e => e.id === singleExam._id)
        if (filteredExam.length > 0 ) {
            const filteredExamObj = filteredExam[0]
            return {...singleExam,...filteredExamObj}
        }else return
    })
    degree = Math.round((degree / exam.length) * 100)
    user.exams.push({ degree: degree , lessonId , lessonExam})
    await user.save()
    res.status(200).json({ msg: "the exam was sent successfully" })
})
module.exports = { createExam, addExamDegree, getExam }


