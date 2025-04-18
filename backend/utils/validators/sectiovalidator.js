const {check}= require('express-validator')
const validator=require('../../middlewares/validator')
const Course = require('../../models/course')
const addSectionValidator=[
    check('title').notEmpty().withMessage('title is required'),
    check('duration').notEmpty().withMessage('duration is required'),
    check('courseId').notEmpty().withMessage('courseId is required').isMongoId().withMessage('courseId is invalid id'),
    validator
]
const deleteSectionValidator=[
    check('sectionId').notEmpty().withMessage('sectionId is required').isMongoId().withMessage('sectionId is invalid id'),
    validator
]
const getSectionValidator=[
    check('sectionId').notEmpty().withMessage('sectionId is required').isMongoId().withMessage('sectionId is invalid id'),
    validator
]
const updateSectionValidator=[
    check('sectionId').notEmpty().withMessage('sectionId is required').isMongoId().withMessage('sectionId is invalid id'),
    validator
]
const getAllSectionsValidator=[
    check('courseId').notEmpty().withMessage('courseId is required').isMongoId().withMessage('courseId is invalid id'),
    validator
]
module.exports={addSectionValidator,deleteSectionValidator,getSectionValidator,getAllSectionsValidator,updateSectionValidator}
