const asynchandler= require('express-async-handler')
const Section = require('../models/section');
const Course = require('../models/course')
const ApiError = require('../utils/apierror')
const addSection =asynchandler(async(req,res,next)=>{
    // @api   post api/v1/:courseId/addsection
    // send courseId as params and title sectionImg , description in body
    const {title,duration} = req.body
    const {courseId} = req.params
    const course =await Course.findOne({_id:courseId})
    if (!course) {
        return next(new ApiError('no course with this id',400))
    }
    const section = await Section.create({title,courseId, duration})
    course.total = course.total + 1 
    course.sections.push(section._id)
    course.save()
    res.status(200).json(section)
})
const getSection =asynchandler(async(req,res,next)=>{
    // @api   get api/v1/getsection/:sectionId
    // send sectionId as params 
    const {sectionId} = req.params
    const section = await Section.findById(sectionId).populate('lessons')
    if (!section) {
        return next(new ApiError('no section with this id',404))
    }
    res.status(200).json(section)
})
const getAllSections =asynchandler(async(req,res,next)=>{
    // @api   get api/v1/getallsections
    const section = await Section.find({}).populate('lessons')
    res.status(200).json({total:section.length,section})
})
const deleteSection =asynchandler(async(req,res,next)=>{
    // @api   delete api/v1/section/:courseId/deletesection/:sectionId
    // send courseId and sectionId as params
    const {sectionId , courseId} = req.params
    const course =await Course.findOne({_id:courseId})
    if (!course) {
        return next(new ApiError('no course with this id',404))
    }
    const section = await Section.deleteMany({_id:sectionId})
    if (!section) {
        return next(new ApiError('no section with this id',404))
    }
    course.sections = course.sections.filter(section => section !== sectionId)
    course.total = course.total - 1
    course.save()
    res.status(200).json({msg:'section is deleted'})
})
const updateSection =asynchandler(async(req,res,next)=>{
    // @api  put api/v1/section/updatesection/:sectionId
    // send  sectionId as params and title in body to update
    const {sectionId} = req.params
    const {title} = req.body
    const section = await Section.findByIdAndUpdate(sectionId,{title},{new:true})
    if (!section) {
        return next(new ApiError('no section with this id',404))
    }
    res.status(200).json(section)
})


module.exports={addSection,deleteSection,getSection,getAllSections,updateSection}
