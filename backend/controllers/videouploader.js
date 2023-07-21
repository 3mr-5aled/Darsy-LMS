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
        chunk_size: 6000000,
        resource_type: "video"
    }
    const video =req.file.path
        const uploadedVideo = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_large(video, opts, (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
            })
        })
        res.status(200).json(uploadedVideo)
})
module.exports = uploadVideo