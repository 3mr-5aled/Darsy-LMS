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
    const homeWorkTimer = req.lesson.homeWorkTimer
    const lessonId = req.lesson._id
    const user = await User.findById(req.user._id)
    if (!req.timer) {   
        user.startSesionTime.push({ createdAt:Date.now() , lessonId , type:'homeWork' })
    }
    await user.save()
    if (!homeWork) {
        return next(new ApiError('homeWork not found', 6141, 404))
    }
    const timer = req.timer ? Math.floor(req.timer / 1000) : homeWorkTimer
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
    const userHomeWork = user.startSesionTime.filter(exam => exam.lessonId.toString() === lessonId && exam.type === "hpmeWork")[0]
    const lesson = await Lesson.findById(lessonId).select('homeWorkTimer homeWork')
    if ( !userHomeWork || (Date.now() > (userHomeWork?.createdAt.getTime() + (lesson.homeWorkTimer * 1000)) && !homeWork )) {
        return next(new ApiError('submit exam first', 6141, 404))
    }
    if (!homeWork) {
        const lessonHomeWork = lesson.homeWork
        const userHomeWork = lessonHomeWork.map(homeWork =>  {
            const answer = {selectedAnswer:[],isCheckBoxQuiz:homeWork.isCheckBoxQuiz,correctAnswer:homeWork.correctAnswer,id:homeWork._id}
            return answer
        })
        const {degree , examAnswer} = addExamDegreeFunction(userHomeWork , lesson)
        user.homeWork.push({ degree, lessonId, homeWorkAnswer })
        await user.save()  
    }
    const lessonHomeWorkUser = user.homeWork.filter(exam => exam.lessonId.toString() === lessonId.toString()) 
    res.status(200).json( user.lessonHomeWorkUser )
})
const addHomeWorkDegree = aynchandler(async (req, res, next) => {
    const { homeWork } = req.body
    const { lessonId } = req.params
    const lesson = await Lesson.findById(lessonId)
    if (!lesson) {
        return next(new ApiError('lesson not found', 6141, 404))
    }
    const user = await User.findById(req.user._id)
    const {degree , examAnswer} = addExamDegreeFunction(homeWork)
    user.exams.push({ degree , lessonId, homeWorkAnswer: examAnswer})
    await user.save()
    res.status(200).json( user.homeWork )
})
module.exports = { createHomeWork, addHomeWorkDegree , getHomeWorkResult , getHomeWork }


