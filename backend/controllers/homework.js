const aynchandler = require('express-async-handler')
const Lesson = require('../models/lesson')
const User = require('../models/user')
const ApiError = require('../utils/apierror')
const sendemail = require('../utils/sendemail')

const createHomeWork = aynchandler(async (req, res, next) => {
    // @api   post api/v1/exam/:lessonId/add-exam
    // you will send lessonId in params and exam object of array in body
    const lesson = await Lesson.findById(req.params.lessonId)
    if (!lesson) {
        return next(new ApiError('lesson not found', 6341, 404))
    }
    const { homeWork , homeWorkTimer} = req.body
    lesson.homeWork = [...exams]
    lesson.homeWorkTimer = homeWorkTimer
    await lesson.save()
    const enrolledUsers = await User.find({ ['enrolledCourse.courseId']: lesson.courseId  })
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
const getHomeWork = aynchandler(async (req, res, next) => {
    // @api   get api/v1/exam/:lessonId/get-exam
    const homeWork = req.lesson.homeWork
    const title = req.lesson.title
    const timer = req.lesson.homeWorkTimer
    const lessonId = req.lesson._id
    const user = await User.findById(req.user._id)
    user.startSesionTime.push({ lessonId , type:'homeWork' })
    await user.save()
    if (!homeWork) {
        return next(new ApiError('homeWork not found', 6141, 404))
    }
    res.status(200).json({ homeWork , title , timer })
    //  you will recieve new lesson object
})
const getHomeWorkResult = aynchandler(async (req, res, next) => {
    // @api   get api/v1/exam/:lessonId/get-exam
    const { lessonId } = req.params
    const {_id} = req.user
    const user = await User.findOne({ _id })
    if (!user) {
        return next(new ApiError('homeWork not found', 6141, 404))
    }
    const homeWork = user.homeWork.filter(homeWork => homeWork.lessonId.toString() === lessonId.toString())[0]
    res.status(200).json( homeWork )
})
const addHomeWorkDegree = aynchandler(async (req, res, next) => {
    const { homeWork } = req.body
    const { lessonId } = req.params
    const lesson = await Lesson.findById(lessonId)
    if (!lesson) {
        return next(new ApiError('lesson not found', 6141, 404))
    }
    const user = await User.findById(req.user._id)
    let degree = 0
    homeWork.map(item => {
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
    const homeWorkAnswer = homeWork.map(singleExam => {
        const filteredExam = lesson.homeWork.filter(e => e._id.toString() === singleExam.id);
        if (filteredExam.length > 0) {
            return {question:filteredExam[0].question,questionImage:filteredExam[0].questionImage,answers:filteredExam[0].answers,correctAnswer:filteredExam[0].correctAnswer,isCheckBoxQuiz:filteredExam[0].isCheckBoxQuiz || singleExam.isCheckBoxQuiz,selectedAnswer:singleExam.selectedAnswer}
        }
        return singleExam
    });
    degree = Math.round((degree / homeWork.length) * 100)
    user.exams.push({ degree: degree, lessonId, homeWorkAnswer })
    await user.save()
    res.status(200).json( user.homeWork )
})
module.exports = { createHomeWork, addHomeWorkDegree , getHomeWorkResult , getHomeWork }


