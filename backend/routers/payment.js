const express=require('express')
const router = express.Router()
const payment =require('../middlewares/payment')
router.post('/',payment)

module.exports=router

