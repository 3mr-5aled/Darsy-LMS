const express=require('express')

const authintication = require('../middlewares/authintication')
const { addSection, deleteSection, getSection, getAllSections, updateSection } = require('../controllers/section')
const { addSectionValidator, deleteSectionValidator, getSectionValidator, updateSectionValidator } = require('../utils/validators/sectiovalidator')

const router = express.Router()

router.post('/:courseId/addsection',addSectionValidator,authintication,addSection)
router.get('/getallsections',getAllSections)
router.get('/getsection/:sectionId',getSectionValidator,getSection)
router.put('/updatesection/:sectionId',updateSectionValidator,authintication,updateSection)
router.delete('/:courseId/deletesection/:sectionId',deleteSectionValidator,authintication,deleteSection)
module.exports=router