const asynchandler = require("express-async-handler");
const ApiError = require("../utils/apierror");
const Owner = require("../models/owner");
const Course = require("../models/course");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const slug = require('slugify')
require('dotenv').config()
const User = require("../models/user");
const ownerRegistration = asynchandler(async (req, res , next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    req.body.password = hashedpassword
    req.body.ownerName = slug(req.body.name)
     const owner = await Owner.create(req.body);
     const user = await User.create({...req.body,role:'owner'})
     const token = jwt.sign({_id:user._id,name:user.name},process.env.JWT);
     res.status(201).cookie("token", token).json('created')
})
const updateOwnerDetails = asynchandler(async (req,res,next)=>{
    const {ownerName} = req.params
    const owner = await Owner.findOneAndUpdate({ownerName},req.body,{new:true})
    res.status(200).json(owner)
})
const getOwnerDetails = asynchandler(async (req,res,next)=>{
    const {ownerName} = req.params
    const owner = await Owner.findOne({ownerName}).select('-password')
    res.status(200).json(owner)
})
module.exports = {ownerRegistration,updateOwnerDetails,getOwnerDetails}

