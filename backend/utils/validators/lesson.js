const {check}= require('express-validator')
const validator=require('../../middlewares/validator')

const addlessonValidator=[
    check('title').notEmpty().withMessage('title is required'),
    check('duration').notEmpty().withMessage('duration is required'),
    check('video').notEmpty().withMessage('video is required'),
    check('courseId').notEmpty().withMessage('courseId is required').isMongoId().withMessage('courseId is invalid id'),
    check('sectionId').notEmpty().withMessage('sectionId is required').isMongoId().withMessage('sectionId is invalid id'),
    validator
]
const getlessonValidator=[
    check('courseId').notEmpty().withMessage('courseId is required').isMongoId().withMessage('courseId is invalid id'),
    check('sectionId').notEmpty().withMessage('sectionId is required').isMongoId().withMessage('sectionId is invalid id'),
    check('lessonId').notEmpty().withMessage('lessonId is required').isMongoId().withMessage('lessonId is invalid id'),
    validator
]
const deletelessonValidator=[
    check('courseId').notEmpty().withMessage('courseId is required').isMongoId().withMessage('courseId is invalid id'),
    check('sectionId').notEmpty().withMessage('sectionId is required').isMongoId().withMessage('sectionId is invalid id'),
    check('lessonId').notEmpty().withMessage('lessonId is required').isMongoId().withMessage('lessonId is invalid id'),
    validator

]
const updatelessonValidator=[
    check('courseId').notEmpty().withMessage('courseId is required').isMongoId().withMessage('courseId is invalid id'),
    check('sectionId').notEmpty().withMessage('sectionId is required').isMongoId().withMessage('sectionId is invalid id'),
    check('lessonId').notEmpty().withMessage('lessonId is required').isMongoId().withMessage('lessonId is invalid id'),
    validator
]
const getAlllessonValidator=[
    check('courseId').notEmpty().withMessage('courseId is required').isMongoId().withMessage('courseId is invalid id'),
    check('sectionId').notEmpty().withMessage('sectionId is required').isMongoId().withMessage('sectionId is invalid id'),
    validator
]
module.exports={addlessonValidator,getlessonValidator,deletelessonValidator,updatelessonValidator,getAlllessonValidator}