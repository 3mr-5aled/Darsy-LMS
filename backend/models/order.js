const mongoose = require('mongoose');

const Order =new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    tran_ref:{
        type:String,
    },
    status:{
        type:String,
        default:"pending"
    }
},{timestamps:true})
    

module.exports = mongoose.model('orders', Order);
