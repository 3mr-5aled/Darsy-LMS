const express=require('express')

const {uploadVideo} = require('../controllers/videouploader')
const authorization = require('../middlewares/authorization')
const authintication = require('../middlewares/authintication')
const uploadFile = require('../middlewares/uploader')
const uploadImage = require('../middlewares/imageupload')
const router = express.Router()
 
router.post('/',authintication,authorization,uploadFile,uploadVideo) 
router.post('/image',authintication,authorization,uploadImage) 

module.exports=router