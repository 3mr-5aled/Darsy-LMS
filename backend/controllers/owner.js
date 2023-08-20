const asynchandler = require("express-async-handler");
const ApiError = require("../utils/apierror");
const Owner = require("../models/owner");
const Course = require("../models/course");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require("../models/user");
const ownerRegistration = asynchandler(async (req, res , next) => {
     const owner = await Owner.create(req.body);
     const user = await User.create({...req.body,role:'owner'})
     const token = jwt.sign({_id:user._id,name:user.name},process.env.JWT);
     res.status(201).cookie("token", token).json('created')
})
const updateOwnerDetails = asynchandler(async (req,res,next)=>{
    const {id} = req.params
    const owner = await Owner.findByIdAndUpdate(id,req.body);
    res.status(200).json('updated')
})
module.exports = {ownerRegistration,updateOwnerDetails}

