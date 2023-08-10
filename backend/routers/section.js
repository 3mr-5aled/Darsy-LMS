const express=require('express')

const authintication = require('../middlewares/authorization')
const authintications = require('../middlewares/authintication')
const { addSection, deleteSection, getSection, getAllSections, updateSection } = require('../controllers/section')
const { addSectionValidator, deleteSectionValidator, getSectionValidator, updateSectionValidator, getAllSectionsValidator } = require('../utils/validators/sectiovalidator')

const router = express.Router()
const csrf = require('csurf')
const csrfProtection =  csrf({ cookie: true })

router.post('/:courseId/add-section',csrfProtection,authintications,authintication,addSectionValidator,addSection)
router.get('/:courseId/get-all-sections',getAllSectionsValidator,getAllSections)
router.get('/get-section/:sectionId',getSectionValidator,getSection)
router.put('/update-section/:sectionId',csrfProtection,authintications,authintication,updateSectionValidator,updateSection)
router.delete('/delete-section/:sectionId',csrfProtection,authintications,authintication,deleteSectionValidator,deleteSection)
module.exports=router