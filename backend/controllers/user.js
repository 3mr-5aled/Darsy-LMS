const aynchandler = require('express-async-handler')
const Lesson = require('../models/lesson')
const User = require('../models/user')
const Order = require('../models/order')
const Course = require('../models/course')
const ApiError = require('../utils/apierror')
const course = require('../models/course')

const getAllUsers = aynchandler(async(req,res,next)=>{
    // @api   get api/v1/user/get-all-users
    const users  = await User.find({}).select('-password').sort('createdAt')
    res.status(200).json(users)
})

const updateUser = aynchandler(async(req,res,next)=>{
    // @api   put api/v1/user/update-user/:userId
    // send userId as params
    const {userId} = req.params
    const user  = await User.findByIdAndUpdate(userId,req.body,{new:true}).select('-password')
    if(!user){
        return next(new ApiError('user not found',404))
    }
    res.status(200).json({user})
})
const addCourseToUser = aynchandler(async(req,res,next)=>{
    // @api   put api/v1/user/add-course-to-user/:userId
    // send userId as params and courseId and amount(price) in body
    const {userId} = req.params
    const admin = req.user
    const {courseId , amount} = req.body
    const user  = await User.findById(userId)
    if(!user){
        return next(new ApiError('user not found',404))
    }
    const courses = user.enrolledCourse.filter(course => course.courseId.toString() === courseId.toString())
    const course = await Course.findById(courseId)
    if(courses.length > 0){
        const expiredDate = Date.now() + course.expiredTime * 24 * 60 * 60 * 1000
        user.enrolledCourse.map(course => course.courseId.toString() === courseId.toString() ? course.expiredDate = expiredDate : course) 
        await user.save()
        const order = await Order.create({userId,courseId,status:'paid',amount,adminId:admin._id})
        console.log(new Date(expiredDate));
        return res.status(200).json({user,order})
    }
    const expiredDate = Date.now() + course.expiredTime * 24 * 60 * 60 * 1000
    user.enrolledCourse.push({courseId,lessonsDone:[],expiredDate})
    await user.save()
    const order = await Order.create({userId,courseId,status:'paid',amount,adminId:admin._id})
    console.log(new Date(expiredDate));
    res.status(200).json({user,order})
})
const deleteUser = aynchandler(async(req,res,next)=>{
    // @api   put api/v1/user/delete-user/:userId
    // send userId as params
    const {userId} = req.params
    const user  = await User.findByIdAndDelete(userId)
    if(!user){
        return next(new ApiError('user not found',404))
    }
    res.status(200).json({user})
})
const getUser = aynchandler(async(req,res,next)=>{
    // @api   put api/v1/user/get-user/:userId
    // send userId as params
    const {userId} = req.params
    const user  = await User.findById(userId).select('-password')
    if(!user){
        return next(new ApiError('user not found',404))
    }
    res.status(200).json({user})
})


module.exports = {getAllUsers,updateUser,getUser,deleteUser,addCourseToUser}


