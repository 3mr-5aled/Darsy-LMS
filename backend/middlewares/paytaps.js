const asynchandler = require('express-async-handler')
const axios = require('axios')
require('dotenv').config()
const payment = asynchandler(async (req, res, next) => {
    const paytabs = require('paytabs_pt2');
    const
        profileID = "124773",
        serverKey = "SJJ9LJWDDR-J6NJ9GHDMD-MJ2JNLHZHG",
        region = "EGY";
    paytabs.setConfig(profileID, serverKey, region);
    let paymentMethods = ['all'];
    let transaction_details = [
        "sale",
        "ecom"
    ];
    let cart_details = [
        "100001",
        "EGP",
        "550",
        "dummy description"
    ];
    let customer = {
        name:"Mohammed ELRayes",
        email:"elrayes@paytabs.com",
        phone:"+201234567890",
        street1:"dummy street, dummy building, dummy apt",
        city:"Heliopolis",
        state:"CAI",
        country:"EG",
        zip:"52121",
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
        
    ];
    let shipping_address = customer_details;
    let url = {
        callback:"http://localhost:3000/api/v1/pay",
        response:"http://localhost:3000/api/v1/pay"
    }
    let response_URLs = [
        url.response,
        url.callback
    ];
    let lang = "ar";
    paymentPageCreated = function ($results) {
        return res.status(200).json({url:$results.redirect_url})
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