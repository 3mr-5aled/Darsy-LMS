const mongoose = require("mongoose");
const ApiError = require("../utils/apierror");

const Courses = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    expiredTime:{
      type:Number,
      default:0
    },
    discount:{
      type: Number,
      default:0
    },
    description: {
      type: String,
      required: true,
    },
    courseImg: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      default: 0,
    },
    sections: [ {type:mongoose.Types.ObjectId,ref:'sections'}],
  },
  { timestamps: true }
);
Courses.pre('findOneAndDelete', async function (next) {
  const course = await this.model.findOne({ _id: this.getQuery()._id })// Get the section ids associated with the course
  if (course.sections.length === 0) {
    return next();
  }
  try { 
    const users =await mongoose.model('users').find({['enrolledCourse.courseId']: course._id})
    if(users.length === 0 ){
      return next();
    }
    users.map(async (user)=>{
      user.enrolledCourse.filter((userCourse)=>userCourse.courseId.toString() !== course._id.toString() )  
      await user.save()
    })
    await mongoose.model('sections').deleteMany({ _id: { $in: course.sections } });
    next();
  } catch (error) {
    next(new ApiError(error,500));
  }
});
module.exports = mongoose.model("courses", Courses);
