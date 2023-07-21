const aynchandler = require('express-async-handler')
const Lesson = require('../models/lesson')
const User = require('../models/user')
const ApiError = require('../utils/apierror')

const getAllUsers = aynchandler(async(req,res,next)=>{
    const user  = await User.find({})
    res.status(200).json({user})
})

const updateUser = aynchandler(async(req,res,next)=>{
    const {userId} = req.params
    const user  = await User.findByIdAndUpdate(userId,req.body)
    res.status(200).json({user})
})


module.exports = {getAllUsers,updateUser}


