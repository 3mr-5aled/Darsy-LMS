const asynchandler = require("express-async-handler");
const ApiError = require("../utils/apierror");
const Owner = require("../models/owner");
const Course = require("../models/course");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");
require('dotenv').config()
const User = require("../models/user");
const ownerRegistration = asynchandler(async (req, res , next) => {
    const salt = await bcrypt.genSalt(10);
    // hash password
    const hashedpassword = await bcrypt.hash(password, salt);
    req.body.password = hashedpassword
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

