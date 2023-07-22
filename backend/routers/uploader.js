const express=require('express')

const videouploader = require('../controllers/videouploader')
const upload = require('../middlewares/multer')
const authorization = require('../middlewares/authorization')
const authintication = require('../middlewares/authintication')
const router = express.Router()
 
router.post('/',authintication,authorization,upload.single('file'),videouploader) 

module.exports=router