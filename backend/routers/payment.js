const express=require('express')
const router = express.Router()
const payment =require('../middlewares/paytaps')
const authintication = require('../middlewares/authintication')
const { createOrder, checkOrder, addCredit, buyCourse } = require('../controllers/order')
const { createOrderValidator } = require('../utils/validators/ordervalidator')
router.post('/pay',authintication,createOrderValidator,createOrder,payment)
router.post('/buy-course',authintication,createOrderValidator,createOrder,buyCourse)
router.post('/check-order',checkOrder)
router.post('/add-credit',authintication,addCredit,payment)
module.exports=router

