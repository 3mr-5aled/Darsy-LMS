const aynchandler = require('express-async-handler')
const Course = require('../models/course')

const createCourse=aynchandler(async(req,res,next)=>{
    const {body}=req
     const course = await Course.create({...body,lastUpdate:new Date()})

     res.status(200).json(course)
})
module.exports={createCourse}