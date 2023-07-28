const express=require('express')
const authintication = require('../middlewares/authorization')
const authintications = require('../middlewares/authintication')
const { addMemberShip, getMemberShip, getAllMemberShip, updateMemberShip, deleteMemberShip } = require('../controllers/member')
const { addMemberValidator, getMemberValidator, deleteMemberValidator, updateMemberValidator } = require('../utils/validators/membervalidator')

const router = express.Router()

router.post('/create-member',authintications,authintication,addMemberValidator,addMemberShip)
router.get('/get-all-members/:grade',getAllMemberShip)
router.get('/get-member/:memberId',getMemberValidator,getMemberShip)
router.put('/update-member/:memberId',authintications,authintication,updateMemberValidator,updateMemberShip)
router.delete('/delete-member/:memberId',authintications,authintication,deleteMemberValidator,deleteMemberShip)

module.exports=router