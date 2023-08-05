const {check}= require('express-validator')
const validator=require('../../middlewares/validator')

const addLessonValidator=[
    check('title').notEmpty().withMessage('title is required'),
    check('duration').notEmpty().withMessage('duration is required'),
    check('description').notEmpty().withMessage('description is required'),
    validator
]
const getLessonValidator=[
    check('lessonId').notEmpty().withMessage('lessonId is required').isMongoId().withMessage('lessonId is invalid id'),
    validator
]
const deleteLessonValidator=[
    check('sectionId').notEmpty().withMessage('sectionId is required').isMongoId().withMessage('sectionId is invalid id'),
    check('lessonId').notEmpty().withMessage('lessonId is required').isMongoId().withMessage('lessonId is invalid id'),
    validator
]
const completeLessonValidator=[
    check('lessonId').notEmpty().withMessage('lessonId is required').isMongoId().withMessage('lessonId is invalid id'),
    validator
]
const updateLessonValidator=[
    check('lessonId').notEmpty().withMessage('lessonId is required').isMongoId().withMessage('lessonId is invalid id'),
    validator
]
const getAllLessonValidator=[
    check('sectionId').notEmpty().withMessage('sectionId is required').isMongoId().withMessage('sectionId is invalid id'),
    validator
]
const continueLessonValidator=[
    check('courseId').notEmpty().withMessage('courseId is required').isMongoId().withMessage('courseId is invalid id'),
    validator
]
module.exports={addLessonValidator,continueLessonValidator,getLessonValidator,completeLessonValidator,deleteLessonValidator,updateLessonValidator,getAllLessonValidator}