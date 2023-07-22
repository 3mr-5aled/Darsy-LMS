const express=require('express')
const router = express.Router()
const payment =require('../middlewares/paytaps')
const authintication = require('../middlewares/authintication')
const { createOrder, checkOrder } = require('../controllers/order')
const { createOrderValidator } = require('../utils/validators/ordervalidator')
router.post('/pay',authintication,createOrderValidator,createOrder,payment)
router.post('/check-order',checkOrder)
module.exports=router

