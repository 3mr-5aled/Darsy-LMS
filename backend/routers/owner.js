const express=require('express')
const { ownerRegistration, updateOwnerDetails } = require('../controllers/owner')
const { registervalidator } = require('../utils/validators/ownervalidators')
const router = express.Router()
router.post('/create-owner',registervalidator,ownerRegistration)
router.put('/update-owner/:id',updateOwnerDetails)
module.exports=router