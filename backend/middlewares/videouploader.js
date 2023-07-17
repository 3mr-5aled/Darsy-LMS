const asynchandler = require('express-async-handler');
const cloudinary = require('cloudinary').v2
require('dotenv').config()
const uploadVideo = asynchandler(async (req, res, next) => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_KEY,
        api_secret: process.env.CLOUD_SECRET
    });
    const opts = {
        overwrite: true,
        invalidate: true,
        resource_type: "video"
    }
        const uploadedVideo = await cloudinary.uploader.upload(req.body.video, opts)
        req.videoUrl = uploadedVideo.secure_url
        next()
    })
module.exports = uploadVideo