const express=require('express')
const authintication = require('../middlewares/authintication')
const { addLesson,getLesson, updateLesson, deleteLesson, getAllLesson } = require('../controllers/lesson')
const { getlessonValidator, deletelessonValidator, updatelessonValidator, getAlllessonValidator } = require('../utils/validators/lesson')

const router = express.Router()
router.post('/:courseId/:sectionId/addlesson',authintication,addLesson)
router.get('/:courseId/:sectionId/getlesson/:lessonId',getlessonValidator,getLesson)
router.get('/:courseId/:sectionId/getalllesson/',getAlllessonValidator,getAllLesson)
router.delete('/:courseId/:sectionId/deletelesson/:lessonId',deletelessonValidator,deleteLesson)
router.put('/:courseId/:sectionId/updatelesson/:lessonId',updatelessonValidator,updateLesson)
module.exports=router