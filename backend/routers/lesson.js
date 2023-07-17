const express=require('express')
const authintication = require('../middlewares/authorization')
const authintications = require('../middlewares/authintication')
const { addLesson,getLesson, updateLesson, deleteLesson, getAllLesson } = require('../controllers/lesson')
const { getlessonValidator, deletelessonValidator, updatelessonValidator, getAlllessonValidator, addlessonValidator } = require('../utils/validators/lesson')
const uploadVideo = require('../middlewares/videouploader')

const router = express.Router()
router.post('/:courseId/:sectionId/addlesson',authintications,authintication,addlessonValidator,uploadVideo,addLesson)
router.get('/:courseId/:sectionId/getlesson/:lessonId',getlessonValidator,getLesson)
router.get('/:courseId/:sectionId/getalllesson/',getAlllessonValidator,getAllLesson)
router.delete('/:courseId/:sectionId/deletelesson/:lessonId',authintications,authintication,deletelessonValidator,deleteLesson)
router.put('/:courseId/:sectionId/updatelesson/:lessonId',authintications,authintication,updatelessonValidator,updateLesson)
module.exports=router