const asynchandler = require("express-async-handler")
const ApiError = require("../utils/apierror")
const Order = require("../models/order")
const Course = require("../models/course")
const User = require("../models/user")
const createOrder = asynchandler(async (req, res, next) => {
  let { courseId } = req.body
  const userFromDB  = await User.findById(req.user._id)
  const course = await Course.findById(courseId)
  const courses = userFromDB.enrolledCourse.filter(enrolledCourse => enrolledCourse.courseId === course._id)
  if (courses.length > 0) {
    if (courses[0].memberId && course[0].memberExpiredTime > Date.now()) {
      return next(new ApiError("You have already enrolled in this course", 9022, 400))
    }else{
      return next(new ApiError("You have already enrolled in this course", 9022, 400))
    }
  } 
  const price = parseInt(course.price)
  const amount =
    course.discount !== undefined
      ? price - price * (course.discount / 100)
      : price
  const order = await Order.create({ amount, userId: req.user._id, courseId , type:'enroll' })
  req.cart_id = order._id
  req.amount = amount
  next()
})
const checkOrder = asynchandler(async (req, res, next) => {
  const order = await Order.findById(req.body.cart_id)
  console.log(order)
  const user = await User.findById(order.userId)
  const { response_code } = req.body.payment_result
  if (response_code != 200) {
    console.log('in')
    await Order.findByIdAndDelete(req.body.cart_id)
    return next(ApiError("Payment failed", 9023, 400))
  }
  order.status = "paid"
  order.tran_ref = req.body.tran_ref
  await order.save()
  if (order.type === 'credit') {
    console.log('innnn')
    user.credit += parseInt(order.amount)
    await user.save()
    return res.status(200).json({ user, order })
  }
  const course = await Course.findById(order.courseId)
    user.enrolledCourse.push({
    courseId: order.courseId,
    lessonsDone: [],
    name: course.name,
    courseImg: course.courseImg,
    lessonTotal: course.total})
    await user.save()
  res.status(200).json({ user, order })
})
const addCredit = asynchandler(async (req, res, next) => {
  const {amount} = req.body
  const user = await User.findById(req.user._id)
  const order = await Order.create({ amount , userId:req.user._id  , type:'credit' })
  req.cart_id = order._id
  req.amount = amount
  req.user =  user
  next()
})
const buyCourse = asynchandler(async (req, res, next) => {
  const {amount , cart_id} = req
  const user = await User.findById(req.user._id)
  if (user.credit < amount) {
    return next(new ApiError("not enough credit", 9024, 400))
  }
  const order = await Order.findById(cart_id)
  const course = await Course.findById(order.courseId)
  user.enrolledCourse.push({
    courseId: order.courseId,
    lessonsDone: [],
    name: course.name,
    courseImg: course.courseImg,
    lessonTotal: course.total})
  user.credit -= amount
  await user.save()
  order.status = "paid"
  await order.save()
  res.status(200).json({ user, order })
})
const getSingleOrder = asynchandler(async(req,res,next)=>{
  const order = req.user.role ==="tutor" ? await Order.findById(req.params.orderId).populate([{path:'userId',select:'name'},{path:'adminId',select:'name'}]).sort("-createdAt").select('') :await Order.findById(req.params.orderId).populate({path:"userId",select:'name'}).select(' -adminId -courseId -tran_ref ').sort("-createdAt")
  if(!order){
    return next(new ApiError('no order is found',8124,404))
  }
  console.log(order)
  res.status(200).json(order)
})
module.exports = { createOrder, checkOrder , addCredit , buyCourse , getSingleOrder}
