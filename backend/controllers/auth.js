const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()


const login=async(req,res)=>{
    // get email and password from request body
   const useremail = req.body.email
   const userpassword =req.body.password
     try {
        // find a user by email 
        const user = await User.findOne({email:useremail})
        // if user isn't found ,server send response ("no email is found")
        if (!user) {
            const error = new Error("no email is found")
            error.code = 400
            throw error
        }
        const {name,email,password,city,phone,dateOfBirth,_id,role,gender,grade,parentsPhone} =user
        // compare password (comes from body ) and password (come from database)
        const isvalid =await bcrypt.compare(userpassword,password)

        // if password is invalid ,server send response ("password is invalid")
        if (!isvalid) {
            const error = new Error("password is invalid")
            error.code = 400
            throw error
        }

        const secret = process.env.JWT
        // use jsonwebtoken to get token
        const token = jwt.sign({_id,name,email,password,city,phone,dateOfBirth,role,gender,grade,parentsPhone},secret)
        // send response with all user details and token as cookie
        res.status(201).cookie('token',token).json(user)
     } catch (error) {
        console.log(error);
        res.status(error.code || 400).json({message:error.message})
     }
}

const register=async(req,res)=>{
    // get all data from request body
    
    let {name,email,password,city,phone,dateOfBirth,role,gender,grade,parentsPhone} = req.body
    try {
        // throw error (400) if name isn't between 4 and 30
        if (name.length < 4 || name.length > 30) {
            const error = new Error('name must be between 4 and 30')
            error.status=400
            throw error
        }
        // throw error (400) if password isn't between 4 and 30
        if (password.length < 8 || password.length > 16) {
            const error = new Error('password must be between 8 and 16')
            error.status=400
            throw error
        }
        // create salt to use it for hashing password
        const salt =await bcrypt.genSalt(10)
        // hash password
        password =await bcrypt.hash(password,salt) 

        const user =await User.create({name,email,password,city,phone,dateOfBirth,role,gender,grade,parentsPhone})
        const {_id}=user
        // use jsonwebtoken to get token
        const token =jwt.sign({_id,name,email,password,city,phone,dateOfBirth,role,gender,grade,parentsPhone},process.env.JWT)
        // send response with all user details and token as cookie
        res.status(201).cookie('token',token).json(user)
    } catch (error) {
        // custom error
        if (error.status === 400) {   
           return res.status(error.status || 401).json({message:error.message})
        }
        if (error.code === 11000){
          return  res.status(400).json({message:'this email is already taken'})
        }
        res.status(400).json({message:error.errors.email.properties.message})
    }
}
const signout=async(req,res)=>{
    // extract token
    const {token} = req.cookies
    res.status(200).cookie('token'," ").json({msg:"signout is done"})
}
const profile =async(req,res)=>{
    // extract token
    const {token} = req.cookies
    // check the token, the user variable contain all details
    const user = jwt.verify(token,process.env.JWT)
    if (!user) {
        res.status(401).json({messsage:"not authinticated"})
    }
    res.status(200).json(user)
}
module.exports={login,register,profile}