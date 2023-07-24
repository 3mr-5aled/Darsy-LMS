class ApiError extends Error{
    constructor(message,errCode,statuscode){
        super(message)
        this.statuscode=statuscode
        this.errCode=errCode
        this.status=`${statuscode}`.startsWith(4)? "fail":'error'
    }
}

module.exports=ApiError