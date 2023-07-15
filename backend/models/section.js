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
    description: {
      type: String,
      required: true,
    },
    sectionImg: {
      type: String,
      required: true,
    },
    courseId:{type:mongoose.Types.ObjectId,ref:'courses'},
    lessons: [{type:mongoose.Types.ObjectId,ref:'lessons'}]
},
  { timestamps: true }
);

module.exports = mongoose.model("sections", Sections);
