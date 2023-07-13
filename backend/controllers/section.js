const asynchandler= require('express-async-handler')
const Course = require('../models/course')

const addSection =asynchandler(async(req,res,next)=>{
    const {title} = req.body
    const {courseId} = req.params
    const course = await Course.findById(courseId)
    course.sections.push({title})
    course.save()
    res.status(200).json(course)
})

module.exports={addSection}