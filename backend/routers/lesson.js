const express=require('express')
const authintication = require('../middlewares/authorization')
const authintications = require('../middlewares/authintication')
const { addLesson,getLesson, updateLesson, deleteLesson, getAllLesson ,completeLesson, continueLessons, previousLesson} = require('../controllers/lesson')
const { getLessonValidator, deleteLessonValidator, updateLessonValidator, addLessonValidator, getAllLessonValidator, completeLessonValidator, continueLessonValidator} = require('../utils/validators/lesson')
const { enrolledCourse } = require('../middlewares/enrolledcourses')

const router = express.Router()

router.post('/:sectionId/add-lesson',authintications,authintication,addLessonValidator,addLesson)
router.get('/get-lesson/:lessonId',authintications,getLessonValidator,enrolledCourse,getLesson)
router.get('/:sectionId/get-all-lessons/',getAllLessonValidator,getAllLesson)
router.delete('/:sectionId/delete-lesson/:lessonId',authintications,authintication,deleteLessonValidator,deleteLesson)
router.put('/update-lesson/:lessonId',authintications,authintication,updateLessonValidator,updateLesson)
router.put('/complete-lesson/:lessonId',authintications,completeLessonValidator,completeLesson)
router.get('/previous-lesson/:lessonId',authintications,completeLessonValidator,previousLesson)
router.get('/:courseId/continue-lesson',authintications,continueLessonValidator,continueLessons)

module.exports=router