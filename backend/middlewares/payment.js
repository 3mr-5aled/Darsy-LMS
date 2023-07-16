const asynchandler =require('express-async-handler')
const axios =require('axios')
require('dotenv').config()
const payment = asynchandler(async(req,res,next)=>{
  console.log(req.user)
    const api = {
        api_key:process.env.API_KEY,
    }
    const firstStep=await axios.post(' https://accept.paymob.com/api/auth/tokens',api)
    const secondStep = await axios.post("https://accept.paymob.com/api/ecommerce/orders",
    {
        "auth_token":  firstStep.data.token,
        "delivery_needed": "false",
        "amount_cents": "100",
        "currency": "EGP",
        "items": [
          {
              "name": "ASC1515",
              "amount_cents": "500000",
              "description": "Smart Watch",
              "quantity": "1"
          }
          ],
       
      })
    const thirdData= {
        "auth_token": firstStep.data.token,
        "amount_cents": "100", 
        "expiration": 3600, 
        "order_id": secondStep.data.id,
        "billing_data": {
          "apartment": "803", 
          "email": "claudette09@exa.com", 
          "floor": "42", 
          "first_name": "Clifford", 
          "street": "Ethan Land", 
          "building": "8028", 
          "phone_number": "+86(8)9135210487", 
          "shipping_method": "PKG", 
          "postal_code": "01898", 
          "city": "Jaskolskiburgh", 
          "country": "CR", 
          "last_name": "Nicolas", 
          "state": "Utah"
        }, 
        "currency": "EGP", 
        "integration_id": 4029317
      }
    const thirdResponse = await axios.post( "https://accept.paymob.com/api/acceptance/payment_keys",thirdData)  
    const walletpayment ={
      "source": {
        "identifier": "wallet mobile number", 
        "subtype": "WALLET"
      },
      "payment_token": thirdResponse.data.token
    }
    const fourthresponse = await axios.post(" https://accept.paymob.com/api/acceptance/payments/pay",walletpayment)
    res.status(200).json({URL:`https://accept.paymobsolutions.com/api/acceptance/wallet_other_test/wallet_template?token=${thirdResponse.data.token}`})
})
module.exports=payment;