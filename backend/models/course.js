const mongoose = require("mongoose");
const ApiError = require("../utils/apierror");

const Courses = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    discount:{
      type: Number,
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
  console.log(course);
  if (course.sections.length === 0) {
    // No sections to delete, move on
    return next();
  }
  try {
    // Delete all sections associated with this course
    // Assuming you have a 'sections' model defined in your code
    await mongoose.model('sections').deleteMany({ _id: { $in: course.sections } });
    next();
  } catch (error) {
    next(new ApiError(error,500));
  }
});
module.exports = mongoose.model("courses", Courses);
