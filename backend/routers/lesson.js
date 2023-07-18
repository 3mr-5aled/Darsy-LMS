const express=require('express')
const authintication = require('../middlewares/authorization')
const authintications = require('../middlewares/authintication')
const { addLesson,getLesson, updateLesson, deleteLesson, getAllLesson } = require('../controllers/lesson')
const { getlessonValidator, deletelessonValidator, updatelessonValidator, addlessonValidator } = require('../utils/validators/lesson')
const uploadVideo = require('../middlewares/videouploader')

const router = express.Router()
router.post('/addlesson',authintications,authintication,addlessonValidator,uploadVideo,addLesson)
router.get('/getlesson/:lessonId',getlessonValidator,getLesson)
router.get('/:sectioonId/getalllesson/',getAllLesson)
router.delete('/:sectionId/deletelesson/:lessonId',authintications,authintication,deletelessonValidator,deleteLesson)
router.put('/updatelesson/:lessonId',authintications,authintication,updatelessonValidator,updateLesson)
module.exports=router