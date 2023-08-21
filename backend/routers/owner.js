const express=require('express')
const { ownerRegistration, updateOwnerDetails, getOwnerDetails } = require('../controllers/owner')
const { registervalidator } = require('../utils/validators/ownervalidators')
const router = express.Router()
router.post('/create-owner',registervalidator,ownerRegistration)
router.put('/update-owner/:ownerName',updateOwnerDetails)
router.get('/get-owner/:ownerName',getOwnerDetails)
module.exports=router