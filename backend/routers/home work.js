const express = require("express")
const authintication = require("../middlewares/authorization")
const authintications = require("../middlewares/authintication")
const { enrolledCourse } = require("../middlewares/enrolledcourses")
const { createHomeWork, addHomeWorkDegree, getHomeWork, getHomeWorkResult } = require("../controllers/homework")
const { checkHomeWork } = require("../middlewares/checkHomeWork")
const router = express.Router()
router.put("/:lessonId/add-exam", authintications, authintication, createHomeWork)
router.get(
  "/:lessonId/get-exam",
  authintications,
  enrolledCourse,
  checkHomeWork,
  getHomeWork
)
router.put("/:lessonId/submit-exam", authintications, addHomeWorkDegree)
router.get("/:lessonId/get-exam-results", authintications, getHomeWorkResult)

module.exports = router
