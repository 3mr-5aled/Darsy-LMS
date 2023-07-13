const aynchandler = require('express-async-handler')
const Course = require('../models/course')
const ApiError = require('../utils/apierror')

const createCourse=aynchandler(async(req,res,next)=>{
    const {body}=req
     const course = await Course.create({...body})
     res.status(200).json(course)
})
const updateCourse=aynchandler(async(req,res,next)=>{
    const {body}=req
    const {id} = req.params
    const course = await Course.findByIdAndUpdate(id,{...body},{new:true})
    res.status(200).json(course)
})
const getAllCourses=aynchandler(async(req,res,next)=>{
    const course = await Course.find({})
    res.status(200).json(course)
})
const getCourse=aynchandler(async(req,res,next)=>{
    const {id} = req.params
    const course = await Course.findById(id)
    if (!course) {
       return next(new ApiError('no course with this id',400))
    }
    res.status(200).json(course)
})
const deleteCourse=aynchandler(async(req,res,next)=>{
    const {id} = req.params
    const course = await Course.findByIdAndDelete(id)
    if (!course) {
        return next(new ApiError('no course with this id',400))
     }
    res.status(200).json({msg:'course is deleted'})
})
module.exports={createCourse,updateCourse,getCourse,getAllCourses,deleteCourse}