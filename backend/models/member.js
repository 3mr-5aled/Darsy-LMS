const mongoose = require("mongoose");

const Member = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },        
        grade: {
            type: String,
            required: true,
            enum: ['sec-1', 'sec-2', 'sec-3', 'prep-1', 'prep-2', 'prep-3']
        },
        
        expiredTime: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            default: 0
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        userId:[{
            type:mongoose.Types.ObjectId,
            res:'users'
        }],
        disabled:{
            type:Boolean,
            default:false
        }
        },
    { timestamps: true }
);
module.exports = mongoose.model("members", Member);
