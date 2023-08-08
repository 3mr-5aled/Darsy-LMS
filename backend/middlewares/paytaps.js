const asynchandler = require("express-async-handler")
const axios = require("axios")
const paytabs = require("paytabs_pt2")
require("dotenv").config()

const isProduction = process.env.NODE_ENV === "production"
const FrontEndBaseUrl = isProduction
  ? process.env.FRONTEND_BASE_URL
  : `http://localhost:${process.env.FRONTEND_PORT}`
const BackEndBaseUrl = isProduction
  ? process.env.BACKEND_BASE_URL
  : "https://0432-197-58-174-141.ngrok-free.app/api/v1/payment/check-order"

const payment = asynchandler(async (req, res, next) => {
  const profileID = process.env.PROFILE_ID,
    serverKey = process.env.SERVER_KEY,
    region = "EGY"
  paytabs.setConfig(profileID, serverKey, region)
  let paymentMethods = ["-valu"]

  let transaction = {
    type: "sale",
    class: "ecom",
  }
  let transaction_details = [transaction.type, transaction.class]
  let cart = {
    id: req.cart_id,
    currency: "EGP",
    amount: req.amount,
    description: "dummy description",
  }

  let cart_details = [cart.id, cart.currency, cart.amount, cart.description]
  let customer = {
    name: "",
    email: req.user.email,
    phone: req.user.phone,
    street1: "",
    city: req.user.city,
    state: "CAI",
    country: "EG",
    zip: "52121",
    IP: "10.0.0.1",
  }
  let customer_details = [
    customer.name,
    customer.email,
    customer.phone,
    customer.street1,
    customer.city,
    customer.state,
    customer.country,
    customer.zip,
    customer.IP,
  ]

  let shipping_address = customer_details

  let url = {
    callback: BackEndBaseUrl,
    return: FrontEndBaseUrl,
  }
  let response_URLs = [url.callback, url.return]
  let lang = "ar"

  paymentPageCreated = function (results) {
    return res.status(200).json({ url: results.redirect_url })
  }
  let frameMode = true
  paytabs.createPaymentPage(
    paymentMethods,
    transaction_details,
    cart_details,
    customer_details,
    shipping_address,
    response_URLs,
    lang,
    paymentPageCreated,
    frameMode
  )
})
module.exports = payment
