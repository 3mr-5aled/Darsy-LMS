const express=require('express')
const router = express.Router()
const payment =require('../middlewares/paytaps')
const authintication = require('../middlewares/authintication')
const { createOrder, checkOrder } = require('../controllers/order')
router.post('/pay',authintication,createOrder,payment)
router.post('/checkorder',checkOrder)
module.exports=router

