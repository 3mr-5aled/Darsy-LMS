const express=require('express')

const {uploadVideo} = require('../controllers/videouploader')
const authorization = require('../middlewares/authorization')
const authintication = require('../middlewares/authintication')
const uploadFile = require('../middlewares/uploader')
const router = express.Router()
 
router.post('/',authintication,authorization,uploadFile,uploadVideo) 

module.exports=router