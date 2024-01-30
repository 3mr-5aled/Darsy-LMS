const mongoose = require("mongoose")
const ApiError = require("../utils/apierror")
const deleteVideo = require('../utils/deleteVideo')
const Lesson = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    index: Number,
    views: Number,
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
    timer: Number,
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
          text: String,
          image: String
        }],
        correctAnswer: [String],
        questionImage: String,
        isCheckBoxQuiz: Boolean,
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
)
Lesson.pre("deleteMany", async function (next) {
  const lesson = await this.model.findOne({ _id: this.getQuery()._id })
  if (!lesson) {
    return next()
  }
  // Get the section ids associated with the course

  try {
    // Delete all sections associated with this course
    // Assuming you have a 'sections' model defined in your code
    await mongoose.model("users").updateMany({}, { $pull: { exams: { lessonId: lesson._id } } })
    if (lesson.video.provider === "local" && lesson.video.fileName) {
      console.log(lesson.video)
      await deleteVideo(lesson.video.fileName)
    }
    const section = await mongoose.model("sections").findById(lesson.sectionId)
    section.lessons.filter((lesson) => lesson !== lesson._id.toString())
    await section.save()
    const course = await mongoose.model("sections").findOne({ _id: section.courseId });
    let index = 0;
    section.lessons.filter((lesson) => lesson !== lesson._id);
    await section.save();
    for (const sectionId of course.sections) {
      const section = await mongoose.model("sections").findById(sectionId)
      let sectionTotal = 0;
      if (!section) {
        continue
      }else{
  
      for (const lessonId of section.lessons) {
        try {
          const lesson = await Lesson.findById(lessonId);
          if (!lesson) {
            console.log(`Lesson not found for ID: ${lessonId}`);
            continue; // Skip to the next iteration if lesson is not found
          }
          sectionTotal++;
          index++;
          lesson.index = index;
          await lesson.save();
        } catch (error) {
          console.error(`Error updating lesson with ID ${lessonId}: ${error.message}`);
          // Handle the error as needed
        }
      }
      
      console.log(`Section Total for Section ${sectionId}: ${sectionTotal}`);
  
      // Update section total and save
      section.total = sectionTotal; // Adding 1 to account for the next lesson
      await section.save();
    }
  
    }
    // Update course total and save
    const users = await mongoose.model("users").find({ ['enrolledCourse.courseId']: course._id })
    users.map(async (user) => {
      user.enrolledCourse.map(userCourse => {
        return userCourse.lessons.filter((lesson) => lesson.lessonId !== lesson._id);
      })
      await user.save();
    })
    course.total = index;
    await course.save();
    console.log(`Final Index: ${index}`);
    next()
  } catch (error) {
    next(new ApiError(error, 500))
  }
})
module.exports = mongoose.model("lessons", Lesson)
