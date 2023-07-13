const asynchandler= require('express-async-handler')
const Course = require('../models/course')
const ApiError = require('../utils/apierror');

const addLesson =asynchandler(async(req,res,next)=>{
    const {courseId,sectionId} = req.params
    const {body} = req
    const course = await Course.findOneAndUpdate({_id:courseId,"sections._id": sectionId },{
        $push:{[`sections.$.lectures`] : body}
    },{new:true})
    if (!course) {
        return next(new ApiError("no courrse is found"),404)
    }
    res.status(200).json(course)
})
const getLesson =asynchandler(async(req,res,next)=>{
    const {courseId,sectionId,lessonId} = req.params
    console.log(courseId,sectionId,lessonId);
    const course = await Course.findOne({_id:courseId})
    if (!course) {
        return next(new ApiError("no courrse is found"),404)
    }else{
        const section = course.sections.map(section => section._id.toString() === sectionId)
        const lesson = section.map(lesson => lesson._id.toString() === lessonId)
        console.log(course,section,lesson);
        return res.status(200).json(lesson)
    }
})

module.exports={addLesson,getLesson}