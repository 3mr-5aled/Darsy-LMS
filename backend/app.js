const express = require('express')
const cors = require('cors')
const cookie =require('cookie-parser')
const authRrouter = require('./routers/auth')
const errorhandler = require('./middlewares/errorhandler')
const { connect } = require('mongoose')
const courseRouter = require('./routers/course')
require('dotenv').config()

const app=express()

const corssettings={
    origin:'',
    Credential:true
}
// middlewares
// axios.defaults.baseurl=
// axios.defaults.withcredintials=true

app.use(express.json())
app.use(cors())
app.use(cookie())

// routes 

app.use('/api/v1/auth',authRrouter)
app.use('/api/v1/course',courseRouter)
app.use(errorhandler)

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
