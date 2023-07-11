const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const login=async(req,res)=>{
   const useremail = req.body.email
   const userpassword =req.body.password
     try {
        const user = await User.findOne({email:useremail})

        if (!user) {
            const error = new Error("no email is found")
            error.code = 400
            throw error
        }

        const {name,email,password,city,phone,dateOfBirth,_id,role} =user
        const isvalid =await bcrypt.compare(userpassword,password)


        if (!isvalid) {
            const error = new Error("password is invalid")
            error.code = 400
            throw error
        }
        const secret = process.env.JWT
        const token = jwt.sign({_id,name,email,password,city,phone,dateOfBirth,role},secret)

        res.status(201).cookie('token',token).json(user)
     } catch (error) {
        console.log(error);
        res.status(error.code || 400).json({message:error.message})
     }
}

const register=async(req,res)=>{
    let {name,email,password,city,phone,dateOfBirth} = req.body
    try {
        if (name.length < 4 || name.length > 30) {
            const error = new Error('name must be between 4 and 30')
            error.status=400
            throw error
        }
        if (password.length < 8 || password.length > 16) {
            const error = new Error('password must be between 8 and 16')
            error.status=400
            throw error
        }

        const salt =await bcrypt.genSalt(10)
        password =await bcrypt.hash(password,salt) 
        const user =await User.create({name,email,password,city,phone,dateOfBirth})
        const {_id,role}=user
        const token =jwt.sign({_id,name,email,password,city,phone,dateOfBirth,role},process.env.JWT)
        res.status(201).cookie('token',token).json(user)
    } catch (error) {
        if (error.status === 400) {   
           return res.status(error.status || 401).json({message:error.message})
        }
        if (error.code === 11000){
          return  res.status(400).json({message:'this email is lready taken'})
        }
        res.status(400).json({message:error.errors.email.properties.message})
    }
}
const profile =async(req,res)=>{
    const {token} = req.cookies

    const user = jwt.verify(token,process.env.JWT)
    if (!user) {
        res.status(401).json({messsage:"not authinticated"})
    }
    console.log(user);
    res.status(200).json(user)
}
module.exports={login,register,profile}