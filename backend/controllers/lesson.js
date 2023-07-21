const asynchandler = require("express-async-handler");
const Lesson = require("../models/lesson");
const User = require("../models/user");
const ApiError = require("../utils/apierror");
const Course = require("../models/course");
const Section = require("../models/section");

const addLesson = asynchandler(async (req, res, next) => {
  // @api post    /sectionId:/addlesson
  // send sectionId and courseId in params and title , duration , material , video in body
  const { sectionId } = req.params;
  const section = await Section.findById(sectionId);
  if (!section) {
    return next(new ApiError("no course or section is found", 404));
  }
  const lesson = await Lesson.create({ ...req.body, courseId: section.courseId, sectionId});
  const course = await Course.findById(section.courseId);
  section.lessons.push(lesson._id)
  section.total = section.total + 1
  await section.save();
  course.total = course.total + 1
  await course.save();
  res.status(200).json(lesson)
});
const getLesson = asynchandler(async (req, res, next) => {
  // @api get    /getlesson/:lessonId
  // send lessonId in params
  const { lesson } = req
  const { title, duration, material, video, _id, exams, description } = lesson
  const sectionTitle = lesson.sectionId.title
  const sectionDuration = lesson.sectionId.duration
  const courseTitle = lesson.courseId.name
  const totalLessons = lesson.courseId.total
  const sections = await Section.find({ courseId: lesson.courseId._id, total: { $gt: 0 } }).populate({
    path: "lessons",
    select: "title", // Include only the 'title' property from the lessons object
  }).select("title duration total")
  res.status(200).json({ lesson: { title, duration, material, video, _id, exams, description }, sections, sectionTitle, sectionDuration, courseTitle, totalLessons });
});

const deleteLesson = asynchandler(async (req, res, next) => {
  // @api delete /:courseId/:sectionId/deletelesson/:lessonId
  // send sectionId and courseId and lessonId in params
  const { sectionId, lessonId } = req.params;
  const lesson = await Lesson.deleteMany({ _id: lessonId });
  const section = await Section.findById(sectionId);
  if (!lesson) {
    return next(new ApiError("no lesson is found", 404));
  }
  section.lessons = section.lessons.filter((lesson) => lesson !== lessonId);
  section.total = section.total - 1
  await section.save();
  const course = await Course.findById(section.courseId);
  course.total = course.total - 1
  await course.save();
  res.status(200).json({ msg: "lesson is removed" });
});
const getAllLesson = asynchandler(async (req, res, next) => {
  // @api get    /getalllesson
  // send sectionId and courseId in params
  const { sectionId } = req.params;
  const lesson = await Lesson.find({ sectionId });
  res.status(200).json(lesson);
});
const updateLesson = asynchandler(async (req, res, next) => {
  // @api put    /updatelesson/:lessonId
  // send sectionId and courseId and lessonId in params and any data to update in body
  const { lessonId } = req.params;
  const lesson = await Lesson.findByIdAndUpdate(lessonId, req.body, {
    new: true,
  });
  if (!lesson) {
    return next(new ApiError("no lesson is found", 404));
  }
  res.status(200).json(lesson);
});
const completeLesson = asynchandler(async (req, res, next) => {
  // @api put    /completelesson/:lessonId
  // send lessonId in params 
  const { lessonId } = req.params;
  const { user } = req
  const lesson = await Lesson.findById(lessonId)
  const userFromDB = await User.findById(user._id)

  userFromDB.enrolledCourse.map((course) => {
     if(course.courseId.toString() === lesson.courseId.toString() && !course.lessonsDone.includes(lessonId) ) {
       course.lessonsDone.push(lessonId)
       return course
      }else{
        return course
      } 
    })
  await userFromDB.save();
  await lesson.populate('sectionId')
  const lessonIndex = lesson.sectionId.lessons.indexOf(lesson._id)
  if (lesson.sectionId.lessons.length - 1 === lessonIndex) {
    await lesson.populate('courseId')
    const sectionIndex = lesson.courseId.sections.indexOf(lesson.sectionId._id)
    if ( lesson.courseId.sections.length - 1 === sectionIndex) {
      return res.status(200).json({ msg : "this is last lesson of course" })
    } 
    const newSectionId = lesson.courseId.sections[sectionIndex + 1]
    const section  = await Section.findById(newSectionId)
    const newLessonId = section.lessons[0]
    return res.status(200).json({ newLessonId , msg : "another section of course"})
  }
  const newLessonId = lesson.sectionId.lessons[lessonIndex + 1]
  res.status(200).json({ newLessonId , msg : "same section"})
})
module.exports = {
  addLesson,
  getLesson,
  deleteLesson,
  updateLesson,
  getAllLesson,
  completeLesson
};
