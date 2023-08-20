const express=require('express')
const { ownerRegistration, updateOwnerDetails } = require('../controllers/owner')
const router = express.Router()
router.post('/create-owner',ownerRegistration)
router.put('/update-owner/:id',updateOwnerDetails)
module.exports=router