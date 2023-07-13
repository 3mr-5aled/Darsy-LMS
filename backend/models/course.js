const mongoose = require('mongoose');

const Courses =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    courseImg:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    courseContent:{
        total:{
            type:Number
        },
        language:{
            type:String,
            
        },
        sections:[
            {
            title:{
                type:String,
                
            },
            lectures:[
                {
                    title: {
                        type:String,
                        
                    },
                    video: {
                        type:String,
                        
                    },
                    material: {
                        type:String,
                        
                    },
                    duration: {
                        type:String,
                        
                    },
                    proggress:{
                        type:String,
                        
                    } 
                  }
            ]
        }
        ,{timestamps:true}
        ]
    }
}, { timestamps: true });

module.exports = mongoose.model('courses', Courses);
