const mongoose = require("mongoose");

const Sections = new mongoose.Schema(
{
    title: {
          type: String,
          required:true
        },
    total:{
        type: String, 
    },
    courseId:{type:mongoose.Types.ObjectId,ref:'courses'},
    lessons: [{type:mongoose.Types.ObjectId,ref:'lessons'}]
},
  { timestamps: true }
);

module.exports = mongoose.model("sections", Sections);
