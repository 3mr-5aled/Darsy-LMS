const errorhandler= (err,req,res,next)=>{
    err.statuscode=err.statuscode || 500
    err.status = err.status || 'error'
    res.status(err.statuscode).json({
        status:err.status,
        message:err.message,
        statuscode:err.statuscode,  
        stack:err.stack,
        err
    })
}


module.exports = errorhandler