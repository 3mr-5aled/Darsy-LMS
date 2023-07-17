const express=require('express')

const authintication = require('../middlewares/authorization')
const authintications = require('../middlewares/authintication')
const { createExam, addExamDegree } = require('../controllers/exam')
const router = express.Router()

router.post('/:lessonId/addexam',authintications,authintication,createExam)
router.post('/:lessonId',authintications,authintication,addExamDegree)
module.exports=router