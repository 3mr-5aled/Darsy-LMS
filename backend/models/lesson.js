const mongoose = require("mongoose")
const ApiError = require("../utils/apierror")

const Lesson = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    index:Number,
    video: {
      src: {
        type: String,
      },
      provider: {
        type: String,
      },
      fileName: {
        type: String,
      },
      publicId: {
        type: String,
      },
    },
    duration: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    material: {
      name: {
        type: String,
      },
      link: {
        type: String,
      },
    },
    timer:Number,
    courseId: { type: mongoose.Types.ObjectId, ref: "courses", required: true },
    sectionId: {
      type: mongoose.Types.ObjectId,
      ref: "sections",
      required: true,
    },
    exams: [
      {
        question: String,
        answers: [{
          text:String,
          image:String
        }],
        correctAnswer: [String],
        questionImage:String,
        isCheckBoxQuiz:Boolean
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
)
Lesson.pre("deleteMany", async function (next) {
  const lesson = await this.model.findOne({ _id: this.getQuery()._id })
  if(!lesson){
    return next()
  }
  // Get the section ids associated with the course

  try {
    // Delete all sections associated with this course
    // Assuming you have a 'sections' model defined in your code
    await mongoose.model("users").updateMany({}, { $pull: { exams: { lessonId: lesson._id } } })
      
    const section = await mongoose.model("sections").findById(lesson.sectionId)
    section.lessons.filter((lesson) => lesson !== lesson._id.toString())
    await section.save()
    next()
  } catch (error) {
    next(new ApiError(error, 500))
  }
})
module.exports = mongoose.model("lessons", Lesson)
