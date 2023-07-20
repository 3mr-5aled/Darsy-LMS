const asynchandler= require('express-async-handler')
const ApiError = require('../utils/apierror')
const Order = require('../models/order')
const User = require('../models/user')
const createOrder =asynchandler(async(req,res,next)=>{
    const {amount,userId,courseId} = req.body
    const order = await Order.create({amount,userId,courseId})
    req.cart_id = order._id
    req.amount = amount
    next()
})
const checkOrder =asynchandler(async(req,res,next)=>{
    const order = await Order.findById(req.body.cart_id)
    const {response_code} = req.body.payment_result
    if (response_code != 200) {
       await Order.findByIdAndDelete(req.body.cart_id)
       return next(ApiError('Payment failed',400))
    }
    const user = await User.findById(order.userId)
    user.enrolledCourse = user.enrolledCourse.push({courseId:order.courseId})
    user.save()
    order.status = 'paid'
    order.save()
    res.status(200).json(order)
})
module.exports={createOrder,checkOrder}
