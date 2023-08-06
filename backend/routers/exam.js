const express = require("express")
const authintication = require("../middlewares/authorization")
const authintications = require("../middlewares/authintication")
const { enrolledCourse } = require("../middlewares/enrolledcourses")
const { createExam, addExamDegree, getExam, getExamResult } = require("../controllers/exam")
const { checkExam } = require("../middlewares/checkExam")

const router = express.Router()

router.put("/:lessonId/add-exam", authintications, authintication, createExam)
router.get(
  "/:lessonId/get-exam",
  authintications,
  authintication,
  enrolledCourse,
  checkExam,
  getExam
)
router.put("/:lessonId/submit-exam", authintications, addExamDegree)
router.get("/:lessonId/get-exam-results", authintications,getExamResult)

module.exports = router
