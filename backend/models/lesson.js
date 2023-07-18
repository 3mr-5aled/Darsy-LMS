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
    description: {
        type: String,
        required: true,
      },
    material:{
        name:{
            type: String,
            required:true
        },
        link:{
            type: String,
            required:true
        }
    },
    courseId:{type:mongoose.Types.ObjectId,ref:'courses'},
    sectionId: {type:mongoose.Types.ObjectId,ref:'lessons'},
    exams:[
        {
            question:{
                type:String,
            },
            answers:[
                {
                    type:String
                }
            ],
            correctAnswer:{
                type:String,
            }
    },{timestamps:true}
]
},
  { timestamps: true }
);
Lesson.pre('deleteMany', async function (next) {
    console.log('inn');
    try {
      // Delete all sections associated with this course
      // Assuming you have a 'sections' model defined in your code
      await mongoose.model('users').updateMany({}, { $pull: { exams: { lessonId: this.getQuery()._id } } });
      next();
    } catch (error) {
      next(new ApiError(error,500));
    }
  }); 
module.exports = mongoose.model("lessons", Lesson);
