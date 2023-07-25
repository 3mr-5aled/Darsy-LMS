const asynchandler = require('express-async-handler');
const ApiError = require('../utils/apierror');
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
        use_filename: true,
        chunk_size: 6000000,
        resource_type: "video"
    }
    if(!req.file){
        return next(new ApiError('file uploaded failed',8090,500))
    }
    const path =req.file.path
    const uploadedVideo = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_large(path, opts, (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
            })
        })
    res.status(200).json(uploadedVideo)
})
const deleteVideo = async(public_id)=>{
        try {
          const result = await cloudinary.uploader.destroy(public_id, { resource_type: "video" });
          console.log(`Successfully removed video with public ID: ${public_id}`);
        } catch (error) {
          next(new ApiError('file uploaded failed',8090,500))
        }
        return result
}
module.exports = {uploadVideo,deleteVideo}