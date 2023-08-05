const {validationResult} = require('express-validator');
const ApiError = require('../utils/apierror');
const validator =(req, res,next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      next(new ApiError(result.array()[0].msg,8903,400))
    }  
    next()
}
module.exports=validator