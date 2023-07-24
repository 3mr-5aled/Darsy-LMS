const express=require('express')

const authintication = require('../middlewares/authorization')
const authintications = require('../middlewares/authintication')
const { createExam, addExamDegree } = require('../controllers/exam')
const router = express.Router()

router.put('/:lessonId/add-exam',authintications,authintication,createExam)
router.put('/:lessonId',authintications,addExamDegree)
module.exports=router