const express=require('express')
const authintication = require('../middlewares/authintication')
const { addSection } = require('../controllers/section')

const router = express.Router()

router.post('/:courseId/addsection',authintication,addSection)
// router.get('/getallcourses',getAllCourses)
// router.get('/getcourse/:id',getCourse)
// router.put('/updatecourse/:id',authintication,updateCourse)
// router.delete('/deletecourse/:id',authintication,deleteCourse)

module.exports=router