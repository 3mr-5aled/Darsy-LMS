const asynchandler= require('express-async-handler')
const ApiError = require('../utils/apierror')
const Order = require('../models/order')
const Course = require('../models/course')
const User = require('../models/user')
const createOrder =asynchandler(async(req,res,next)=>{
    let {courseId} = req.body
    const course = await Course.findById(courseId)
    const price  = parseInt(course.price)
    const amount = course.discount !== undefined ? price - (price * (course.discount / 100)) : price
    const order = await Order.create({amount,userId:req.user._id,courseId})
    req.cart_id = order._id
    req.amount = amount
    next()
})
const checkOrder =asynchandler(async(req,res,next)=>{
    console.log(req.headers,req.headers,req.body);
    const order = await Order.findById(req.body.cart_id)
    const {response_code} = req.body.payment_result
    if (response_code != 200) {
       await Order.findByIdAndDelete(req.body.cart_id)
       return next(ApiError('Payment failed',400))
    }
    console.log(order);
    const user = await User.findById(order.userId)
    user.enrolledCourse.push({ courseId: order.courseId, lessonsDone: [] });
    await user.save()
    order.status = 'paid'
    await order.save()
    res.status(200).json(order)
})
module.exports={createOrder,checkOrder}
