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
    const {exams} = req.body
    exams.forEach(async (exam) => {
    exam.answers.forEach(async (answer) => {
        if (!answer.image) return 
        const uploadedImage = await cloudinary.uploader.upload(answer.image, opts)
        answer.imageUrl = uploadedImage.secure_url
    })
    if (exam.questionImage) {
        const uploadedImage = await cloudinary.uploader.upload(questionImage, opts)
        exam.questionImage = uploadedImage.secure_url
    } 
})
    req.exams = exams
     next()   
    })
module.exports = uploadImage