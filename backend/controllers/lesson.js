const asynchandler = require("express-async-handler");
const Lesson = require("../models/lesson");
const ApiError = require("../utils/apierror");
const Course = require("../models/course");
const Section = require("../models/section");

const addLesson = asynchandler(async (req, res, next) => {
  // @api post /:courseId/:sectionId/addlesson
  // send sectionId and courseId in params and title , duration , material , video in body
  const { sectionId, courseId } = req.params;
  const course = await Course.findById(courseId);
  const section = await Section.findById(sectionId);
  if (!course || !section) {
    return next(new ApiError("no course or section is found", 404));
  }
  const lesson = await Lesson.create({...req.body,...req.videoUrl});
  section.lessons.push(lesson._id);
  section.save();
  res.status(200).json(lesson);
});

const getLesson = asynchandler(async (req, res, next) => {
  // @api get /:courseId/:sectionId/getlesson/:lessonId
  // send sectionId and courseId and lessonId in params
  const { sectionId, courseId, lessonId } = req.params;
  const course = await Course.findById(courseId);
  const section = await Section.findById(sectionId);
  if (!course || !section) {
    return next(new ApiError("no course or section is found", 404));
  }
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    return next(new ApiError("no lesson is found", 404));
  }
  res.status(200).json(lesson);
});

const deleteLesson = asynchandler(async (req, res, next) => {
  // @api delete /:courseId/:sectionId/deletelesson/:lessonId
  // send sectionId and courseId and lessonId in params
  const { sectionId, courseId, lessonId } = req.params;
  const course = await Course.findById(courseId);
  const section = await Section.findById(sectionId);
  if (!course || !section) {
    return next(new ApiError("no course or section is found", 404));
  }
  const lesson = await Lesson.findByIdAndDelete(lessonId);
  if (!lesson) {
    return next(new ApiError("no lesson is found", 404));
  }
  section.lessons = section.lessons.filter((lesson) => lesson !== lessonId);
  section.save();
  res.status(200).json({ msg: "lesson is removed" });
});
const getAllLesson = asynchandler(async (req, res, next) => {
  // @api get /:courseId/:sectionId/getalllesson
  // send sectionId and courseId in params
  const { sectionId, courseId } = req.params;
  const course = await Course.findById(courseId);
  const section = await Section.findById(sectionId);
  if (!course || !section) {
    return next(new ApiError("no course or section is found", 404));
  }
  const lesson = await Lesson.find({});
  res.status(200).json(lesson);
});
const updateLesson = asynchandler(async (req, res, next) => {
  // @api put /:courseId/:sectionId/updatelesson/:lessonId
  // send sectionId and courseId and lessonId in params and any data to update in body
  const { sectionId, courseId, lessonId } = req.params;
  const course = await Course.findById(courseId);
  const section = await Section.findById(sectionId);
  if (!course || !section) {
    return next(new ApiError("no course or section is found", 404));
  }
  const lesson = await Lesson.findByIdAndUpdate(lessonId, req.body, {
    new: true,
  });
  if (!lesson) {
    return next(new ApiError("no lesson is found", 404));
  }
  res.status(200).json(lesson);
});
module.exports = {
  addLesson,
  getLesson,
  deleteLesson,
  updateLesson,
  getAllLesson,
};
