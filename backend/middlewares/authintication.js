const jwt =require('jsonwebtoken')
const User = require('../models/user')
const ApiError = require('../utils/apierror')
require('dotenv').config()
const authintication =async(req,res,next)=>{
    const {token}=req.cookies
    console.log(token);
    if (!token) {
        return next(new ApiError("please login or register",3824,401)) 
    }
    const user = jwt.verify(token,process.env.JWT)
    const userFromDB =await User.findById(user._id)
    if (!userFromDB) {
        return next(new ApiError("please login or register",3824,401)) 
    }
    req.user = userFromDB
    next()
}
module.exports=authintication