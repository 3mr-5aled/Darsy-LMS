const express=require('express')

const videouploader = require('../controllers/videouploader')
const upload = require('../middlewares/multer')
const router = express.Router()
 
router.post('/',upload.single('file'),videouploader) 

module.exports=router