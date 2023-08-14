const mongoose = require("mongoose");
const ApiError = require("../utils/apierror");

const Courses = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
    },
    grade: {
      type: String,
      required: true,
      enum: ['sec-1', 'sec-2', 'sec-3', 'prep-1', 'prep-2', 'prep-3']
    },
    expiredTime: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      required: true,
    },
    courseImg: {
      src: {
        type: String,
      },
      fileName: {
        type: String,
      },
      publicId: {
        type: String,
      }
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
    appearenceDate:{
      type:Number,
      default:Date.now()
    },
    isShown:Boolean,
    sections: [{ type: mongoose.Types.ObjectId, ref: 'sections' }],
  },
  { timestamps: true }
);
Courses.pre('findOneAndDelete', async function (next) {
  const course = await this.model.findOne({ _id: this.getQuery()._id })// Get the section ids associated with the course
  try {
    if (!course) {
      return next();
    }
    if (course.sections.length === 0) {
      return next();
    }
    await mongoose.model('sections').deleteMany({ _id: { $in: course.sections } });
    next();
  } catch (error) {
    next(new ApiError(error, 500));
  }
});
module.exports = mongoose.model("courses", Courses);
