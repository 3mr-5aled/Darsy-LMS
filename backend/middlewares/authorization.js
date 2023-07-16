const jwt =require('jsonwebtoken')
const User = require('../models/user')
const ApiError = require('../utils/apierror')
require('dotenv').config()
const authintication =async(req,res,next)=>{
    const {user} = req 
    const userFromDB =await User.findById(user._id)
    if (userFromDB.role === 'tutor') {
        req.user = userFromDB
        return next()
    }else{
        return next(new ApiError('you are not admin',401))
    }
}
module.exports=authintication