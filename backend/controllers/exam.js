const aynchandler = require('express-async-handler')
const Lesson = require('../models/lesson')
const User = require('../models/user')
const ApiError = require('../utils/apierror')
const sendemail = require('../utils/sendemail')
const { addExamDegreeFunction } = require('../utils/addExamDegree')
const lesson = require('../models/lesson')

const createExam = aynchandler(async (req, res, next) => {
    // @api   post api/v1/exam/:lessonId/add-exam
    // you will send lessonId in params and exam object of array in body
    const lesson = await Lesson.findById(req.params.lessonId)
    if (!lesson) {
        return next(new ApiError('lesson not found', 6341, 404))
    }
    const { exams, timer } = req.body
    lesson.exams = [...exams]
    lesson.examTimer = timer
    await lesson.save()
    const enrolledUsers = await User.find({ ['enrolledCourse.courseId']: lesson.courseId })
    enrolledUsers.map(async (user) => {
        const options = {
            email: user.email,
            message: `new exam was added seconds ago `,
            text: `new exam was added in ${lesson.title} lesson \n hurry to solve the exam`,
            name: user.name
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
    const examTimer = req.lesson.examTimer
    const lessonId = req.lesson._id
    const user = await User.findById(req.user._id)
    if (!req.timer) {
        user.startSesionTime.push({ lessonId, type: 'exam' })
        await user.save()
    }
    if (!exam) {
        return next(new ApiError('exam not found', 6141, 404))
    }
    const timer = req.timer ? Math.floor(req.timer / 1000) : examTimer
    res.status(200).json({ exam, title, timer })
})
const getExamResult = aynchandler(async (req, res, next) => {
    // @api   get api/v1/exam/:lessonId/get-exam
    const { lessonId } = req.params
    const { _id } = req.user
    const user = await User.findOne({ _id })
    if (!user) {
        return next(new ApiError('exam not found', 6141, 404))
    }
    const exam = user.exams.filter(exam => exam.lessonId.toString() === lessonId.toString())[0]
    const userExam = user.startSesionTime.filter(exam => exam.lessonId.toString() === lessonId && exam.type === "exam")[0]
    const lesson = await Lesson.findById(lessonId).select('examTimer exams')
    if ( !userExam || (Date.now() > (userExam?.createdAt.getTime() + (lesson.examTimer * 1000)) && !exam )) {
        return next(new ApiError('submit exam first', 6141, 404))
    }
    if (!exam) {
        const lessonExam = lesson.exams
        const userExam = lessonExam.map(exam => {
            const answer = { selectedAnswer: [], isCheckBoxQuiz: exam.isCheckBoxQuiz, correctAnswer: exam.correctAnswer, id: exam._id }
            return answer
        })
        const {degree , examAnswer} = addExamDegreeFunction(userExam, lesson)
        user.exams.push({ degree, lessonId, examAnswer })
        await user.save()
    }
    const lessonExamUser = user.exams.filter(exam => exam.lessonId.toString() === lessonId.toString()) 
    res.status(200).json(lessonExamUser)
})
const addExamDegree = aynchandler(async (req, res, next) => {
    const { exam } = req.body
    const { lessonId } = req.params
    const lesson = await Lesson.findById(lessonId)
    if (!lesson) {
        return next(new ApiError('lesson not found', 6141, 404))
    }
    const user = await User.findById(req.user._id)
    const { degree, examAnswer } = addExamDegreeFunction(exam)
    user.exams.push({ degree: degree, lessonId, examAnswer })
    await user.save()
    res.status(200).json(user.exams)
})
module.exports = { createExam, addExamDegree, getExam, getExamResult }


