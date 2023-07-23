const asynchandler = require('express-async-handler');
const cloudinary = require('cloudinary').v2
require('dotenv').config()
const uploadImage = asynchandler(async (req, res, next) => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_KEY,
        api_secret: process.env.CLOUD_SECRET
    });
    const opts = {
        overwrite: true,
        invalidate: true,
        resource_type: "auto"
    }
        const uploadedImage = await cloudinary.uploader.upload(req.body.image, opts)
        req.imageUrl = uploadedImage.secure_url
        next()
    })
module.exports = uploadImage