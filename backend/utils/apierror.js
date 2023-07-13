class ApiError extends Error{
    constructor(message,statuscode){
        super(message)
        this.statuscode=statuscode
        this.status=`${statuscode}`.startsWith(4)? "fail":'error'
    }
}

module.exports=ApiError