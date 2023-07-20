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
        req.cart_id,
        "EGP",
        req.amount,
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
        customer.id
    ];
    let shipping_address = customer_details;
    let url = {
        callback:"https://webhook.site/e027fdcd-ff77-49da-b75b-dc1635dc987f",
        response:"https://e1e2-41-236-216-101.ngrok-free.app/api/v1/payment/checkorder"
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
        frameMode,
        data
    );
})
module.exports = payment;