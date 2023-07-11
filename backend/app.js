const express = require('express')
const cors = require('cors')
const cookie =require('cookie-parser')
const authrouter = require('./routers/auth')
const { connect } = require('mongoose')
require('dotenv').config()

const app=express()

const corssettings={
    origin:'',
    Credential:true
}
// middlewares

app.use(express.json())
app.use(cors())
app.use(cookie())

// routes 

app.use('/auth',authrouter)


const start=async()=>{
    try {
        port = process.env.PORT || 3000
        await connect(process.env.URL)
        app.listen(port,()=>{
            console.log(`server is running on port ${port}`);
        })
    } catch (error) {
        console.log(error.message);
    }
}

start()
