const aynchandler = require('express-async-handler')
const Lesson = require('../models/lesson')
const User = require('../models/user')
const Order = require('../models/order')
const Course = require('../models/course')
const ApiError = require('../utils/apierror')
const Member = require('../models/member')

const getAllUsers = aynchandler(async (req, res, next) => {
    // @api   get api/v1/user/get-all-users
    const { courseId } = req.query
    const users = await User.find({}).select('-password').sort('createdAt')
    if (courseId) {
        const enrolledUsers = await User.find({ ['enrolledCourse.courseId']: courseId })
        const unEnrolledUsers = users.filter(user => user.enrolledCourse.every(course => course.courseId.toString() !== courseId))
        const course = await Course.findById(courseId).select('price discount')
        return res.status(200).json({ enrolledUsers, unEnrolledUsers, course })
    }
    res.status(200).json(users)
})

const updateUser = aynchandler(async (req, res, next) => {
    // @api   put api/v1/user/update-user/:userId
    // send userId as params
    const { userId } = req.params
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true }).select('-password')
    if (!user) {
        return next(new ApiError('user not found', 1341, 404))
    }
    res.status(200).json({ user })
})
const addCourseToUser = aynchandler(async (req, res, next) => {
    // @api   put api/v1/user/add-course-to-user/:userId
    // send userId as params and courseId and amount(price) in body
    const { userId } = req.params
    const admin = req.user
    const { courseId, amount } = req.body
    const user = await User.findById(userId)
    if (!user) {
        return next(new ApiError('user not found', 1341, 404))
    }
    const courses = user.enrolledCourse.filter(course => course.courseId.toString() === courseId.toString())
    const course = await Course.findById(courseId)
    if (courses.length > 0) {
        user.enrolledCourse.map(courses => courses.courseId.toString() === courseId.toString() ? { ...courses, lessonTotal: course.total } : courses)
        await user.save()
        const order = await Order.create({ userId, courseId, status: 'paid', amount, adminId: admin._id })
        return res.status(200).json({ order, msg: "user already bougth this coursse" })
    }
    if (!course) {
        return next(new ApiError('course not found', 1341, 404))
    }
    user.enrolledCourse.push({ courseId, lessonsDone: [], name: course.name, courseImg: course.courseImg, lessonTotal: course.total })
    await user.save()
    const order = await Order.create({ userId, courseId, status: 'paid', amount, adminId: admin._id, type: 'enroll' })
    res.status(200).json({ user, order })
})
const removeUserFromCourse = aynchandler(async (req, res, next) => {
    // @api   put api/v1/user/delete-user/:userId
    // send userId as params
    const { userId } = req.params
    const { courseId } = req.body
    const user = await User.findById(userId)
    if (!user) {
        return next(new ApiError('user not found', 1341, 404))
    }
    user.enrolledCourse = user.enrolledCourse.filter(course => course.courseId.toString() !== courseId)
    await user.save()
    res.status(200).json({ user, msg: "the user deleted successfully from course " })
})
const deleteUser = aynchandler(async (req, res, next) => {
    // @api   put api/v1/user/delete-user/:userId
    // send userId as params
    const { userId } = req.params
    const user = await User.findByIdAndDelete(userId)
    if (!user) {
        return next(new ApiError('user not found', 1341, 404))
    }
    res.status(200).json({ user })
})
const getUser = aynchandler(async (req, res, next) => {
    // @api   get api/v1/user/get-user/:userId
    // send userId as params
    const { userId } = req.params
    const user = await User.findById(userId).select('-password -forgetpasswordcode -forgetpasswordexpired -forgetpasswordvalidation ').populate({
        path: 'exams.lessonId',
        select: 'title'
    })
    if (!user) {
        return next(new ApiError('user not found', 1341, 404))
    }
    const userOrders = await Order.find({userId}).populate({path:'courseId',select:'name'}).populate([{path:'userId',select:'name'},{path:'adminId',select:'name'}]).sort("-createdAt")
    const { gender, role, name, grade, phone, parentsPhone, dateOfBirth, city , credit , email } = user
    const userDetails = { gender, role, name, grade, phone, parentsPhone, dateOfBirth, city , credit , email}
    const userDegrees = user.exams.map(exam => ({ degree: parseInt(exam.degree), lessonTitle: exam.lessonId.title, examDate: exam.createdAt, lessonId: exam.lessonId._id }))
    const userCourses = user.enrolledCourse.map(course => ({ name: course.name, courseId: course.courseId, courseImg: course.courseImg, progress: (Math.ceil(course.lessonsDone.length / course.lessonTotal) * 100) }))
    const userMembership = user.memberShip.memberId && user.memberShip.expiredTime > Date.now() ? { ...user.memberShip } : {}
    res.status(200).json({ userDetails: { ...userDetails }, userDegrees, userCourses, lastSignedIn: user.lastSignedIn, userMembership , userOrders})
})
const editCredit = aynchandler(async (req, res, next) => {
    const { userId } = req.params
    const { amount } = req.body
    const user = await User.findById(userId)
    const price = user.credit + amount
    if (price < 0) {
        return next(new ApiError('you dont have enough credit', 1341, 404))
    }
    const order = await Order.create({ amount, userId: userId, status: 'paid', adminId: req.user._id, type: 'credit' })
    user.credit += amount
    await user.save()
    res.status(200).send({ user, order })
})
const addMemberShip = aynchandler(async (req, res, next) => {
    const { memberId } = req.params
    const user = await User.findById(req.user._id)
    const member = await Member.findById(memberId)
    if (!member) {
        return next(new ApiError("member not found", 8532, 400))
    }
    if (member.grade !== user.grade) {
        return next(new ApiError("you can't buy this membership", 8532, 400))
    }
    if (user.memberShip.memberId && user.memberShip.expiredTime > Date.now()) {
        return next(new ApiError("you already boght membership ", 8532, 400))
    }
    const totalPrice = user.credit - member.price
    if (totalPrice < 0) {
        return next(new ApiError('you dont have enough credit', 1341, 404))
    }
    const order = await Order.create({ amount: member.price, userId: req.user._id, status: 'paid', type: 'member' })
    member.userId.push(user._id)
    await member.save()
    const courses = await Course.find({ grade: member.grade })
    console.log(courses.length)
    const userCourses = courses.map(course => {
        const enrolledCourse = user.enrolledCourse.filter(userCourse =>  userCourse.courseId.toString() === course._id.toString());
        if (enrolledCourse.length > 0) {
            return  course
            
        } else {
            course.memberId= member._id,
            course.memberExpiredTime= Date.now() + member.expiredTime * 24 * 60 * 60 * 1000
            return  course
            
        }

    });
    user.enrolledCourse = userCourses
    user.credit = totalPrice
    user.memberShip.name = member.name
    user.memberShip.memberId = member._id
    user.memberShip.expiredTime = Date.now() + (member.expiredTime * 24 * 60 * 60 * 1000)
    await user.save()
    res.status(200).send({ user, order })
})
module.exports = { getAllUsers, addMemberShip, updateUser, getUser, deleteUser, addCourseToUser, removeUserFromCourse, editCredit }


