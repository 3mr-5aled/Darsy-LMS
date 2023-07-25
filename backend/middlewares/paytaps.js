const asynchandler = require('express-async-handler')
const axios = require('axios')
const paytabs = require('paytabs_pt2');
require('dotenv').config()
const payment = asynchandler(async (req, res, next) => {
    const
        profileID = "124773",
        serverKey = "SJJ9LJWDDR-J6NJ9GHDMD-MJ2JNLHZHG",
        region = "EGY";
    paytabs.setConfig(profileID, serverKey, region);
    let paymentMethods = ["all"];

    let transaction = {
        type:"sale",
        class:"ecom"
    };
let transaction_details = [
    transaction.type,
    transaction.class
];
let cart = {
    id: req.cart_id,
    currency: "EGP",
    amount: req.amount,
    description: "dummy description"
};

let cart_details = [
    cart.id,
    cart.currency,
    cart.amount,
    cart.description
];
let customer = {
    name:req.user.name,
    email:req.user.email,
    phone:req.user.phone,
    street1:"",
    city:req.user.city,
    state:"CAI",
    country:"EG",
    zip:"52121",
    IP:"10.0.0.1"
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
    customer.IP
];

let shipping_address = customer_details;

let url = {
    callback:"https://fa0a-197-58-241-107.ngrok-free.app/api/v1/payment/check-order",
    response:"https://webhook.site/b0328eaf-3c6f-4bcf-858b-747d95d8bf8b"
}
let response_URLs = [
    url.callback,
    url.response
];
let lang = "ar";

paymentPageCreated = function (results) {
 return res.status(200).json({url:results.redirect_url})
}
let frameMode = true;
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
);
})
module.exports = payment;