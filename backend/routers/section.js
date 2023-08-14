const express=require('express')

const authintication = require('../middlewares/authorization')
const authintications = require('../middlewares/authintication')
const { addSection, deleteSection, getSection, getAllSections, updateSection } = require('../controllers/section')
const { addSectionValidator, deleteSectionValidator, getSectionValidator, updateSectionValidator, getAllSectionsValidator } = require('../utils/validators/sectiovalidator')

const router = express.Router()


router.post('/:courseId/add-section',authintications,authintication,addSectionValidator,addSection)
router.get('/:courseId/get-all-sections',getAllSectionsValidator,getAllSections)
router.get('/get-section/:sectionId',getSectionValidator,getSection)
router.put('/update-section/:sectionId',authintications,authintication,updateSectionValidator,updateSection)
router.delete('/delete-section/:sectionId',authintications,authintication,deleteSectionValidator,deleteSection)
module.exports=router