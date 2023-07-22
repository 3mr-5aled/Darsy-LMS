const mongoose = require('mongoose');

const User =new mongoose.Schema({
    name: {
        required: [true,"name is required"],
        min: [4, 'characters must be between 3 and 30'],
        max: [30, 'characters must be between 3 and 30'],
        type: String
    },
    email: {
        required: true,
        unique: [true, 'this email is already taken'],
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    forgetpasswordcode:String,
    forgetpasswordexpired:Date,
    forgetpasswordvalidation:Boolean,
    city: {
        required: true,
        type: String,
    },
    parentsPhone:{
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    dateOfBirth: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String,
        min: [8, "password must be between 8 and 16 characters"],
        max: [16, "password must be between 8 and 16 characters"]
    },
    role:{
        type:String,
        default:"student"
    },
    gender:{
        type:String,
    },
    grade:{
        type:String,
    },
    enrolledCourse: [{
        courseId: {
            type: mongoose.Schema.ObjectId,
            ref: 'courses'
        },
        lessonsDone:[{
            type: mongoose.Schema.ObjectId,
            ref: 'lessons'
        }]
    }],
    exams:[
        {
            lessonId:{
                type: mongoose.Schema.ObjectId,
                ref: 'lessons'
            },
            degree:{
                type:String
            }
        }
        ,{timestamps:true}
    ],
    lastLesson:{
        type: mongoose.Schema.ObjectId,
        ref: 'lessons'
    }
}, { timestamps: true });

module.exports = mongoose.model('users', User);
