const asynchandler = require('express-async-handler')
const multer = require('multer')
const path = require('path')
const util = require('util');

const storage =multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null, __dirname + "/../uploads" )
    },
    filename:function (req,file,cb) {
        cb(null, Date.now() + file.originalname )
    }
})

const uploadFile = asynchandler(async(req,res,next)=>{
    const upload = multer({storage:storage}).single("file")
    const uploadFile = util.promisify(upload);
    await uploadFile(req, res)  
    // Multer has processed the file and added it to req.file
    // You can perform additional operations if needed
    next();
})
module.exports =uploadFile