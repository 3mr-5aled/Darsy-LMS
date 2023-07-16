const express=require('express')

const authintication = require('../middlewares/authorization')
const authintications = require('../middlewares/authintication')
const { addSection, deleteSection, getSection, getAllSections, updateSection } = require('../controllers/section')
const { addSectionValidator, deleteSectionValidator, getSectionValidator, updateSectionValidator } = require('../utils/validators/sectiovalidator')

const router = express.Router()

router.post('/:courseId/addsection',authintications,authintication,addSectionValidator,addSection)
router.get('/getallsections',getAllSections)
router.get('/getsection/:sectionId',getSectionValidator,getSection)
router.put('/updatesection/:sectionId',authintications,authintication,updateSectionValidator,updateSection)
router.delete('/:courseId/deletesection/:sectionId',authintications,authintication,deleteSectionValidator,deleteSection)
module.exports=router