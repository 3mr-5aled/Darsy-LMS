const aynchandler = require('express-async-handler')
const Lesson = require('../models/lesson')
const User = require('../models/user')
const ApiError = require('../utils/apierror')

const createExam = aynchandler(async(req,res,next)=>{
    // @api   post api/v1/exam/:lessonId/add-exam
    // you will send lessonId in params and exam object of array in body
    const lesson = await Lesson.findById(req.params.lessonId)
    if(!lesson){
        return next(new ApiError('lesson not found',6341, 404 ))
    }
    const {body} =req
    lesson.exams=[...body]
    await lesson.save()
    res.status(200).json(lesson.exams)
    //  you will recieve new lesson object
})

const addExamDegree = aynchandler(async(req,res,next)=>{
    const {exam} = req.body
    let degree = 0
    exam.map(item=>{
        if(item.isCheckBoxQuiz){
            const correct = item.selectedAnswer.map(answer => { item.correctAnswer.includes(answer) ? true : false});
            const trueAnswers = correct.filter(item => item === true)
            degree += trueAnswers.length/item.correctAnswer.length
        }
        else{
            if(item.selectedAnswer === item.correctAnswer[0]){
                degree++
            }
        }
        return degree 
    })
    degree = (degree/exam.length) * 100 
    const user = await User.findById(req.user._id)
    user.exams.push({degree,lessonId:req.params.lessonId})
    await user.save()
    await user.populate('exams.lessonId')
    res.status(200).json(user)
})
module.exports = {createExam,addExamDegree}


