const Lesson = require("../models/lesson");
const ApiError = require("../utils/apierror");

const blockingExam = async (req, res, next) => {
    const { user } = req
    const { lessonId } = req.params;
    const lesson = await Lesson.findById(lessonId)
    if (user.role === 'tutor') {
        next()
    }
    if (!lesson.blockingExamId) {
        return next()
    }
    const userExam = user.exams.find(exam => exam.lessonId.toString() === lesson.blockingExamId.toString())
    if (!userExam) {
        return next (new ApiError('please solve exam first', 400 , 654)) 
    }
    next()
}
module.exports = {blockingExam} ;