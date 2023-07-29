const mongoose = require("mongoose")

const Lesson = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
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
    courseId: { type: mongoose.Types.ObjectId, ref: "courses", required: true },
    sectionId: {
      type: mongoose.Types.ObjectId,
      ref: "sections",
      required: true,
    },
    exams: [
      {
        question: {
          type: String,
        },
        answers: [
          {
            type: String,
          },
        ],
        correctAnswer: {
          type: String,
        },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
)
Lesson.pre("deleteMany", async function (next) {
  try {
    // Delete all sections associated with this course
    // Assuming you have a 'sections' model defined in your code
    await mongoose
      .model("users")
      .updateMany({}, { $pull: { exams: { lessonId: this.getQuery()._id } } })

    next()
  } catch (error) {
    next(new ApiError(error, 500))
  }
})
module.exports = mongoose.model("lessons", Lesson)
