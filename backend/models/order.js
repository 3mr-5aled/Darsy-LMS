const mongoose = require('mongoose');

const Order =new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    adminId:{
        type:mongoose.Schema.Types.ObjectId,

    },
    amount:{
        type:String,
        required:true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        
    },
    tran_ref:{
        type:String,
    },
    status:{
        type:String,
        default:"pending"
    },
    type:{
        type:String,
        enum:['credit','enroll','member']
    }
},{timestamps:true})
    

module.exports = mongoose.model('orders', Order);
