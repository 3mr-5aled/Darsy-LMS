const express=require('express')

const videouploader = require('../controllers/videouploader')
const upload = require('../middlewares/multer')
const authorization = require('../middlewares/authorization')
const authintication = require('../middlewares/authintication')
const uploadFile = require('../middlewares/multer')
const router = express.Router()
 
router.post('/',authintication,authorization,uploadFile,videouploader) 

module.exports=router