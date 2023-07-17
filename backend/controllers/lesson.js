const asynchandler = require("express-async-handler");
const Lesson = require("../models/lesson");
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
  const lesson = await Lesson.create({...req.body,video:req.videoUrl});
  section.lessons.push(lesson._id);
  section.total = section.total + 1
  section.save();
  res.status(200).json(lesson);
});

const getLesson = asynchandler(async (req, res, next) => {
  // @api get    /getlesson/:lessonId
  // send sectionId and courseId and lessonId in params
  const {  lessonId } = req.params;
  const lesson = await Lesson.findById(lessonId);
  if (!lesson ) {
    return next(new ApiError("no lesson is found", 404));
  }
  res.status(200).json(lesson);
});

const deleteLesson = asynchandler(async (req, res, next) => {
  // @api delete /:courseId/:sectionId/deletelesson/:lessonId
  // send sectionId and courseId and lessonId in params
  const {   sectionId,lessonId } = req.params;
  const lesson = await Lesson.deleteMany({_id:lessonId});
  const section = await Section.findById(sectionId);
  if (!lesson ) {
    return next(new ApiError("no lesson is found", 404));
  }
  section.lessons = section.lessons.filter((lesson) => lesson !== lessonId);
  section.total = section.total + 1
  section.save();
  res.status(200).json({ msg: "lesson is removed" });
});
const getAllLesson = asynchandler(async (req, res, next) => {
  // @api get    /getalllesson
  // send sectionId and courseId in params
  const lesson = await Lesson.find({});
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
module.exports = {
  addLesson,
  getLesson,
  deleteLesson,
  updateLesson,
  getAllLesson,
};
