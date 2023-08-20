const mongoose = require("mongoose");
const ApiError = require("../utils/apierror");
const Course = require('../models/course')
const Sections = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      default:0
    },
    owner: {
      type: String,
      required: true,
    },
    courseId: { type: mongoose.Types.ObjectId, ref: 'courses' },
    lessons: [{ type: mongoose.Types.ObjectId, ref: 'lessons' }]
  },
  { timestamps: true }
);
Sections.pre('deleteMany', async function (next) {
  const section = await this.model.findOne({ _id: this.getQuery()._id })// Get the section ids associated with the course
  console.log(section);
  if (!section) {
    return next()
  }
  if (section.lessons.length === 0) {
    // No sections to delete, move on
    return next();
  }
  try {
    // Delete all sections associated with this course
    // Assuming you have a 'sections' model defined in your code
    const course = await Course.findById(section.courseId)
    course.sections.filter((section) => section !== section._id.toString())
    await course.save()
    await mongoose.model('lessons').deleteMany({ _id: { $in: section.lessons } });
    next();
  } catch (error) {
    next(new ApiError(error,500));
}
});

module.exports = mongoose.model("sections", Sections);
