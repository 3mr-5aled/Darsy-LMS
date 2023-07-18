const express=require('express')
const router = express.Router()
const payment =require('../middlewares/paytaps')
const authintication = require('../middlewares/authintication')
router.post('/',authintication,payment)

module.exports=router

