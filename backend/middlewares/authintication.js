const jwt =require('jsonwebtoken')
const User = require('../models/user')
const ApiError = require('../utils/apierror')
require('dotenv').config()
const authintication =async(req,res,next)=>{
    const {token}=req.cookies
    const user = jwt.verify(token,process.env.JWT)
    const userFromDB =await User.findById(user._id)
    if (!userFromDB) {
        return next(new ApiError('un authorized',401)) 
    }
    req.user = userFromDB
    next()
}
module.exports=authintication