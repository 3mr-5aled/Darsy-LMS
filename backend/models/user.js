const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        required: [true, "name is required"],
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
    forgetpasswordcode: String,
    forgetpasswordexpired: Date,
    forgetpasswordvalidation: Boolean,
    city: {
        type: String,
    },
    parentsPhone: {
        type: String,
        unique:false
    },
    blocked:{
        type:Boolean,
        default:false
    },
    phone: {
        required: true,
        type: String
    },
    dateOfBirth: {        
        type: String
    },
    password: {
        required: true,
        type: String,
        min: [8, "password must be between 8 and 16 characters"],
        max: [16, "password must be between 8 and 16 characters"]
    },
    role: {
        type: String,
        default: "student"
    },
    gender: {
        type: String,
    },
    grade: {
        type: String,
        enum: ['sec-1', 'sec-2', 'sec-3', 'prep-1', 'prep-2', 'prep-3']
    },
    enrolledCourse: [{
        courseId: {
            type: mongoose.Schema.ObjectId,
            ref: 'courses'
        },
        lastSignedInCourse: Number,
        lessonsDone: [
            {
            type: mongoose.Schema.ObjectId,
            ref: 'lessons'
        }
        ],
        lessons:[{
            views:Number,
            lessonId: {
                type: mongoose.Schema.ObjectId,
                ref: 'lessons'
            }
        }],
        nextLesson: {
            type: mongoose.Schema.ObjectId,
            ref: 'lessons'
        },
        name: String,
        lessonTotal: Number,
        courseImg: String,
        memberId:{
            type: mongoose.Schema.ObjectId,
            ref: 'members'
        },
        memberExpiredTime: Date,
    }, { timestamps: true }],
    exams: [
        {
            lessonId: {
                type: mongoose.Types.ObjectId,
                ref: 'lessons'
            },
            degree: {
                type: String
            },
            examAnswer:[
               { 
                question: String,
                questionImage:String,
                answers: [ {
                    text: String,
                    image: String
                }],
                correctAnswer: [ String ],
                isCheckBoxQuiz: Boolean,
                selectedAnswer: [ String ]
            }
            ],
            createdAt: {
            type: Date,
            default: Date.now()
            }
        }],
        homeWork: [
            {
                lessonId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'lessons'
                },
                degree: {
                    type: String
                },
                homeWorkAnswer:[
                   { 
                    question: String,
                    questionImage:String,
                    answers: [ {
                        text: String,
                        image: String
                    }],
                    correctAnswer: [ String ],
                    isCheckBoxQuiz: Boolean,
                    selectedAnswer: [ String ]
                }
                ],
                createdAt: {
                type: Date,
                default: Date.now()
                }
            }],
    memberShip: {
        expiredTime: Date,
        name: String,
        memberId: {
            type: mongoose.Schema.ObjectId,
            ref: 'members'
        }
    },
    credit: {
        type: Number,
        default: 0
    },
    startSesionTime:[
        {
            lessonId: {
                type: mongoose.Schema.ObjectId,
                ref: 'lessons'
            },
            createdAt: {
                type: Date,
                default: Date.now()
            },
            type:{
                enum: ['exam','homeWork'],
                type: String
            }

        }
    ],
    lastSignedIn: Date,
    nextLesson:{
        type: mongoose.Schema.ObjectId,
        ref: 'lessons'
    }
}, { timestamps: true });
module.exports = mongoose.model('users', User);
