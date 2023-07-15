const mongoose = require("mongoose");

const Lesson = new mongoose.Schema(
{
    title: {
        type: String,
        required:true
        },
    video:{
        type: String, 
        required:true
    },
    duration:{
        type: String, 
        required:true
    },
    material:{
        type: String, 
    },
    courseId:{type:mongoose.Types.ObjectId,ref:'courses'},
    sectionId: {type:mongoose.Types.ObjectId,ref:'lessons'},
    exams:[]
},
  { timestamps: true }
);

module.exports = mongoose.model("lessons", Lesson);
