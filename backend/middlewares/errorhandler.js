const errorhandler= (err,req,res,next)=>{
    err.statuscode=err.statuscode || 500
    err.status = err.status || 'error'
    err.errCode = err.errCode ||  1234
    res.status(err.statuscode).json({
        status:err.status,
        errCode:err.errCode,
        message:err.message,
        statuscode:err.statuscode,  
        stack:err.stack,
        err
    })
}
module.exports = errorhandler