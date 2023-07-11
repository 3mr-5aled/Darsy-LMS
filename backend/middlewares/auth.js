const jwt =require('jsonwebtoken')
require('dotenv').config()
const authintication =(req,res,next)=>{
    const {token}=req.cookies
    const user = jwt.verify(token,process.env.JWT)
    
}