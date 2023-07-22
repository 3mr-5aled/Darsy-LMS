const aynchandler = require('express-async-handler')
const Lesson = require('../models/lesson')
const User = require('../models/user')
const ApiError = require('../utils/apierror')

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


module.exports = {getAllUsers,updateUser,getUser,deleteUser}


