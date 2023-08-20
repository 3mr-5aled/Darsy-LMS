const aynchandler = require('express-async-handler')
const Course = require('../models/course')
const ApiError = require('../utils/apierror')
const User = require('../models/user')
const Order = require('../models/order')
const Lesson = require('../models/lesson')

const getAnalysis = aynchandler(async (req, res, next) => {
  const {owner} = req.query

    const students = await User.find({owner, role: 'student' }).select('-password -city -gender -credit -exams -dateOfBirth -phone -parentsPhone')
    const courses = await Course.find({owner}).length
    const lessons = await Lesson.find({owner}).lenght
    const todaySignedInStudents = students.filter(student => student.lastSignedIn?.toDateString() === new Date().toDateString()).length
    const enrolledStudents = students.filter(student => student.enrolledCourse.length >= 1).length
    const studentsInMembership = students.filter(student => student.memberShip.expiredTime > Date.now()).length
    const studentsWithNoMembership = students.filter(student =>  student.memberShip.memberId === undefined || student.memberShip.expiredTime < Date.now()).length
    const studentsWithNoEnrolledCourse = students.filter(student => student.enrolledCourse.length === 0).length
    const orders = await Order.find({owner})
    let allMoney = 0
    orders.forEach(order => allMoney += parseInt(order.amount))
    let todayMoney = 0
    const todayOrder = orders.filter(order => order.createdAt.toDateString() === new Date().toDateString())
    todayOrder.forEach(order => todayMoney += parseInt(order.amount))
    res.status(200).json({ allMoney, todayMoney, courses, lessons, todaySignedInStudents, enrolledStudents, studentsInMembership, studentsWithNoMembership, studentsWithNoEnrolledCourse })
})

const getMoneyPerPeriod = aynchandler(async (req, res, next) => {
    const { year, month, day } = req.query
  const {owner} = req.query

    const orders = await Order.find({owner})
    let totalMoney = []
    if (year && month && day) {
        totalMoney = calculateTotalMoneyPerWeek(year, month, day ,orders)
        return res.status(200).json(totalMoney)
    }
    if (year && month) {
        totalMoney = calculateTotalMoneyPerDay(year, month, orders)
        return res.status(200).json(totalMoney)
    }
    if (year) {
        totalMoney = calculateTotalMoneyPerMonth(year, orders)
        return res.status(200).json(totalMoney)
    }
    next(new ApiError('you must send year at least', 4161 ,400))
})
function calculateTotalMoneyPerMonth(year, orders) {
    const totalMoneyPerMonth = Array(12).fill(0);
    orders.forEach((order) => {
        const orderDate = new Date(order.createdAt);
        if (orderDate.getFullYear() === parseInt(year)) {
            const month = orderDate.getMonth();
            totalMoneyPerMonth[month] += parseInt(order.amount);
        }
    });
    return totalMoneyPerMonth;
}

function calculateTotalMoneyPerDay(year, month, orders) {
    const firstDayOfMonth = new Date(parseInt(year), parseInt(month) - 1, 2);
    const lastDayOfMonth = new Date(parseInt(year), parseInt(month) , 1);
    const totalMoneyPerDay = [];
    firstDayOfMonth.setUTCHours(0,0,0,0)
    lastDayOfMonth.setUTCHours(0,0,0,0)
    console.log(firstDayOfMonth)
    console.log(lastDayOfMonth)
    let currentDate = new Date(firstDayOfMonth);
    while (currentDate <= lastDayOfMonth) {
        const totalMoneyForDay = orders.reduce((total, order) => {
            const orderDate = new Date(order.createdAt);
            if (orderDate.toDateString() === currentDate.toDateString()) {
                return total + parseInt(order.amount);
            }
            return total;
        }, 0);
        totalMoneyPerDay.push(totalMoneyForDay);
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return totalMoneyPerDay;
}
function calculateTotalMoneyPerWeek(year, month, day, orders) {
    const lastDayOfWeek = new Date(parseInt(year), parseInt(month) - 1, parseInt(day) + 1);
    const firstDayOfWeek = new Date(parseInt(year), parseInt(month) - 1, parseInt(day) - 5);
    const totalMoneyPerDay = [];
    firstDayOfWeek.setUTCHours(0,0,0,0)
    lastDayOfWeek.setUTCHours(0,0,0,0)
    console.log(firstDayOfWeek)
    console.log(lastDayOfWeek);
    let currentDate = new Date(firstDayOfWeek);
    while (currentDate <= lastDayOfWeek) {
        const totalMoneyForDay = orders.reduce((total, order) => {
            const orderDate = new Date(order.createdAt);
            if (orderDate.toDateString() === currentDate.toDateString()) {
                return total + parseInt(order.amount);
            }
            return total;
        }, 0);
        totalMoneyPerDay.push(totalMoneyForDay);
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return totalMoneyPerDay;
}
module.exports = { getAnalysis, getMoneyPerPeriod }