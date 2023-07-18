const aynchandler = require('express-async-handler')
const Course = require('../models/course')
const ApiError = require('../utils/apierror')

const createCourse=aynchandler(async(req,res,next)=>{
     // @api   post api/v1/course/createcourse
    //  you will send name ,description,courseImg,duration,price,language in body
    const {name,description,duration,price,image}=req.body
     const course = await Course.create({name,description,duration,price,courseImg:req.imageUrl})
     res.status(200).json(course)
    //  you will recieve course object
})
const updateCourse=aynchandler(async(req,res,next)=>{
     // @api   put api/v1/course/updatecourse/:id
     // you will send data to update inn  body and id ass params
    const {body}=req
    const {id} = req.params
    const course = await Course.findByIdAndUpdate(id,{...body},{new:true})
    res.status(200).json(course)
    // you recieve the new course object
})
const getAllCourses=aynchandler(async(req,res,next)=>{
     // @api   get api/v1/course/getallcourses
    const course = await Course.find({}).populate('sections')
    res.status(200).json(course)
})
const getCourse=aynchandler(async(req,res,next)=>{
     // @api   get api/v1/course/getcourse/:id
    //  send id as params
    const {id} = req.params
    const course = await Course.findById(id).populate('sections')
    if (!course) {
       return next(new ApiError('no course with this id',400))
    }
    res.status(200).json(course)
    // get specific course
})
const deleteCourse=aynchandler(async(req,res,next)=>{
     // @api   delete api/v1/course/deletecourse/:id
    //  send id as params
    const {id} = req.params
    const course = await Course.findOneAndDelete({_id:id})
    if (!course) {
        return next(new ApiError('no course with this id',400))
     }
    res.status(200).json({msg:'course is deleted'})
    // recieve {msg:'course is deleted'} if course is deleted
})
module.exports={createCourse,updateCourse,getCourse,getAllCourses,deleteCourse}