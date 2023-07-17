const aynchandler = require('express-async-handler')
const Lesson = require('../models/lesson')
const User = require('../models/user')
const ApiError = require('../utils/apierror')

const createExam = aynchandler(async(req,res,next)=>{
    // @api   post api/v1/exam/:lessonId/addexam
    // you will send lessonId in params and exam object of array in body
    const lesson = await Lesson.findById(req.params.lessonId)
    if(!lesson){
        return next(new ApiError('lesson not found', 404 ))
    }
    const {body} =req
    lesson.exams=[...body]
    await lesson.save()
    res.status(200).json(lesson)
    //  you will recieve new lesson object
})

const addExamDegree = aynchandler(async(req,res,next)=>{
    // @api   post api/v1/exam/:lessonId
    // you will send lessonId in params and degree  in body
    const {degree} = req.body
    const user = await User.findById(req.user._id)
    user.exams.push({degree,lessonId:req.params.lessonId})
    await user.save()
    await user.populate('exams.lessonId')
    res.status(200).json(user)
})
module.exports = {createExam,addExamDegree}


