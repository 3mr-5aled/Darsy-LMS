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
    const { exams , timer} = req.body
    lesson.exams = [...exams]
    lesson.timer = timer
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
    const timer = req.lesson.timer
    if (!exam) {
        return next(new ApiError('exam not found', 6141, 404))
    }
    res.status(200).json({ exam, title , timer })
    //  you will recieve new lesson object
})
const getExamResult = aynchandler(async (req, res, next) => {
    // @api   get api/v1/exam/:lessonId/get-exam
    const { lessonId } = req.params
    const {_id} = req.user
    const user = await User.findOne({ _id })
    if (!user) {
        return next(new ApiError('exam not found', 6141, 404))
    }
    const exam = user.exams.filter(exam => exam.lessonId.toString() === lessonId.toString())[0]
    res.status(200).json( exam )
    //  you will recieve new lesson object
})
const addExamDegree = aynchandler(async (req, res, next) => {
    const { exam } = req.body
    const { lessonId } = req.params
    const lesson = await Lesson.findById(lessonId)
    if (!lesson) {
        return next(new ApiError('lesson not found', 6141, 404))
    }
    console.log(exam)
    const user = await User.findById(req.user._id)
    let degree = 0
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
    const examAnswer = exam.map(singleExam => {
        const filteredExam = lesson.exams.filter(e => e._id.toString() === singleExam.id);
        if (filteredExam.length > 0) {
            return {question:filteredExam[0].question,questionImage:filteredExam[0].questionImage,answers:filteredExam[0].answers,correctAnswer:filteredExam[0].correctAnswer,isCheckBoxQuiz:filteredExam[0].isCheckBoxQuiz || singleExam.isCheckBoxQuiz,selectedAnswer:singleExam.selectedAnswer}
        }
        return singleExam
    });
    degree = Math.round((degree / exam.length) * 100)
    user.exams.push({ degree: degree, lessonId, examAnswer })
    await user.save()
    res.status(200).json( user.exams )
})
module.exports = { createExam, addExamDegree, getExam, getExamResult }


