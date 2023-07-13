const {check}= require('express-validator')
const validator=require('../../middlewares/validator')

const addlessonValidator=[
    check('title').notEmpty().withMessage('title is required'),
    check('duration').notEmpty().withMessage('duration is required'),
    check('matetrial').notEmpty().withMessage('mattetrial is required'),
    check('video').notEmpty().withMessage('video is required'),
    
    validator
]
module.exports={addlessonValidator}