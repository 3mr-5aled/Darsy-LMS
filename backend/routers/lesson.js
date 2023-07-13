const express=require('express')
const authintication = require('../middlewares/authintication')
const { addLesson,getLesson } = require('../controllers/lesson')

const router = express.Router()

router.post('/:courseId/:sectionId/addlesson',authintication,addLesson)
router.get('/:courseId/:sectionId/:lessonId/getlesson',getLesson)
// router.put('/updatecourse/:id',authintication,updateCourse)
// router.delete('/deletecourse/:id',authintication,deleteCourse)

module.exports=router