const asynchandler = require("express-async-handler");
const Lesson = require("../models/lesson");
const User = require("../models/user");
const ApiError = require("../utils/apierror");
const Course = require("../models/course");
const Section = require("../models/section");

const addLesson = asynchandler(async (req, res, next) => {
  // @api  post    /sectionId:/add-lesson
  // send sectionId and courseId in params and title , duration , material , video in body
  const { sectionId } = req.params;
  const section = await Section.findById(sectionId);
  if (!section) {
    return next(new ApiError("no course or section is found",9341, 404));
  }
  const lesson = await Lesson.create({ ...req.body, courseId: section.courseId, sectionId });
  console.log(section.courseId);
  const course = await Course.findOne({ _id: section.courseId });
  section.lessons.push(lesson._id)
  section.total = section.total + 1
  await section.save();
  course.total = course.total + 1
  await course.save();
  const users = await User.find({ ['enrolledCourse.courseId']: course._id })

  users.map(async (user) => {
    user.enrolledCourse.map(userCourse => {
      if (userCourse.courseId.toString() === section.courseId.toString()) {
        userCourse.lessonTotal = course.total
        return userCourse
      } else {
        return userCourse
      }
    })
    await user.save()
  })
  res.status(200).json(lesson)
});
const getLesson = asynchandler(async (req, res, next) => {
  // @api get    /get-lesson/:lessonId
  // send lessonId in params
  // you must be enrolled in this lesson to get lesson
  const { lesson } = req
  const { title, duration, material, video, _id, exams, description, courseId } = lesson
  const sectionTitle = lesson.sectionId.title
  const sectionDuration = lesson.sectionId.duration
  const courseTitle = lesson.courseId.name
  const totalLessons = lesson.courseId.total
  const sections = await Section.find({ courseId: lesson.courseId._id, total: { $gt: 0 } }).populate({
    path: "lessons",
    select: "title", // Include only the 'title' property from the lessons object
  }).select("title duration total")
  res.status(200).json({ lesson: { title, duration, material, video, _id, exams, description }, sections, sectionTitle, sectionDuration, courseTitle, course: courseId, totalLessons });
});

const deleteLesson = asynchandler(async (req, res, next) => {
  // @api delete /:sectionId/delete-lesson/:lessonId
  // send sectionId and courseId and lessonId in params
  const { sectionId, lessonId } = req.params;
  const lesson = await Lesson.deleteMany({ _id: lessonId });
  const section = await Section.findById(sectionId);
  if (!lesson) {
    return next(new ApiError("no lesson is found",6341, 404));
  }
  section.lessons = section.lessons.filter((lesson) => lesson !== lessonId);
  section.total = section.total - 1
  await section.save();
  const course = await Course.findOne({ _id: section.courseId });
  course.total = course.total - 1
  await course.save();
  const users = await User.find({ ['enrolledCourse.courseId']: course._id })
  users.map(async (user) => {
    user.enrolledCourse.map(userCourse => {
      if (userCourse.courseId.toString() === section.courseId.toString()) {
        userCourse.lessonTotal = course.total
        return userCourse
      } else {
        return userCourse
      }
    })
    await user.save()
  })
  res.status(200).json({ msg: "lesson is removed" });
});
const getAllLesson = asynchandler(async (req, res, next) => {
  // @api get    /:sectionId/get-all-lesson
  // send sectionId  in params
  const { sectionId } = req.params;
  const lesson = await Lesson.find({ sectionId });
  if (lesson.length === 0) {
    return res.status(200).json({ errCode :9483 });
  }
  res.status(200).json(lesson);
});
const updateLesson = asynchandler(async (req, res, next) => {
  // @api put    /update-lesson/:lessonId
  // send lessonId in params and any data to update in body
  const { lessonId } = req.params;
  const lesson = await Lesson.findByIdAndUpdate(lessonId, req.body, {
    new: true,
  });
  if (!lesson) {
    return next(new ApiError("no lesson is found",6341, 404));
  }
  res.status(200).json(lesson);
});
const completeLesson = asynchandler(async (req, res, next) => {
  // @api put    /complete-lesson/:lessonId
  // send lessonId in params 
  const { lessonId } = req.params;
  const { user } = req
  console.log(user)
  const lesson = await Lesson.findById(lessonId)
  const userFromDB = await User.findById(user._id)
  userFromDB.enrolledCourse.map((course) => {
    if (course.courseId.toString() === lesson.courseId.toString() && !course.lessonsDone.includes(lessonId)) {
      course.lessonsDone.push(lessonId)
      return course
    } else {
      return course
    }
  })
  await userFromDB.save();
  await lesson.populate('sectionId')
  const lessonIndex = lesson.sectionId.lessons.indexOf(lesson._id)
  if (lesson.sectionId.lessons.length - 1 === lessonIndex) {
    await lesson.populate('courseId')
    const sectionIndex = lesson.courseId.sections.indexOf(lesson.sectionId._id)
    if (lesson.courseId.sections.length - 1 === sectionIndex) {
      return res.status(200).json({ msg: "this is last lesson of course" })
    }
    const newSectionId = lesson.courseId.sections[sectionIndex + 1]
    const section = await Section.findById(newSectionId)
    const newLessonId = section.lessons[0]
    // userFromDB.nextLesson = newLessonId
    userFromDB.enrolledCourse.map(course => course.courseId.toString() === lesson.courseId._id.toString() ? { ...course, nextLesson: newLessonId } : course)
    await userFromDB.save();
    return res.status(200).json({ newLessonId, msg: "another section of course" })
  }
  const newLessonId = lesson.sectionId.lessons[lessonIndex + 1]
  userFromDB.enrolledCourse.map(course => course.courseId.toString() === lesson.courseId._id.toString() ? { ...course, nextLesson: newLessonId } : course)
  await userFromDB.save();
  res.status(200).json({ newLessonId, msg: "same section" })
})
const previousLesson = asynchandler(async (req, res, next) => {
  // @api put    /previous-lesson/:lessonId
  // send lessonId in params 
  const { lessonId } = req.params;
  const lesson = await Lesson.findById(lessonId)
  await lesson.populate('sectionId')
  const lessonIndex = lesson.sectionId.lessons.indexOf(lesson._id)
  if (lessonIndex === 0) {
    await lesson.populate('courseId')
    const sectionIndex = lesson.courseId.sections.indexOf(lesson.sectionId._id)
    if (sectionIndex === 0) {
      return res.status(200).json({ msg: "this is first lesson of course" })
    }
    const newSectionId = lesson.courseId.sections[sectionIndex - 1]
    const section = await Section.findById(newSectionId)
    const previousLessonId = section.lessons[section.lessons.length - 1]
    return res.status(200).json({ previousLessonId, msg: "another section of course" })
  }
  const previousLessonId = lesson.sectionId.lessons[lessonIndex - 1]
  res.status(200).json({ previousLessonId, msg: "same section" })
})
const continueLessons = asynchandler(async (req, res, next) => {
  // @api get /api/v1/lesson/:courseId/continue-lesson
  const { user } = req
  const { courseId } = req.params
  const userFromDB = await User.findById(user._id)
  const courseFromDB = await Course.findById(courseId)
  if (!courseFromDB) {
    return next(new ApiError('no coursse is found', 404))
  }
  const course = userFromDB.enrolledCourse.filter(course => course.courseId === courseId)
  if (!course.nextLesson) {
    return next(new ApiError("no lesson is found", 404));
  }
  res.status(200).json({ nextLesson: course.nextLesson, courseTitle: courseFromDB.name, coureseImg: courseFromDB.courseImg })
})
module.exports = {
  addLesson,
  getLesson,
  deleteLesson,
  updateLesson,
  getAllLesson,
  completeLesson,
  continueLessons,
  previousLesson
};
