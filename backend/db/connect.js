const mongoose = require('mongoose')
require('dotenv').config()
const connect=(url)=>{
    return mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports=connect
