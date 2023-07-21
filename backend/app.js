const express = require('express')
const cors = require('cors')
const cookie =require('cookie-parser')
const authRrouter = require('./routers/auth')
const errorhandler = require('./middlewares/errorhandler')
const { connect } = require('mongoose')
const courseRouter = require('./routers/course')
const sectionRouter = require('./routers/section')
const lessonRouter = require('./routers/lesson')
const paymentRouter = require('./routers/payment')
const uploadImage = require('./middlewares/imageupload')
const examRouter = require('./routers/exam')
const payment = require('./middlewares/paytaps')
const uploaderRouter = require('./routers/uploader')
const userRouter = require('./routers/user')
require('dotenv').config()
const app = express()

const corssettings = {

  origin: "http://localhost:8080/",

  origin: "http://localhost:8080",
  credential: true,
}
// middlewares
// axios.defaults.baseurl=
// axios.defaults.withcredintials=true

app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
)
app.use(cookie())

// routes

app.use('/api/v1/auth',authRrouter)
app.use('/api/v1/course',courseRouter)
app.use('/api/v1/section',sectionRouter)
app.use('/api/v1/lesson',lessonRouter)
app.use('/api/v1/payment',paymentRouter)
app.use('/api/v1/exam',examRouter)
app.use('/api/v1/upload',uploaderRouter)
app.use('/api/v1/user',userRouter)
app.use(errorhandler)

const start = async () => {
  try {
    port = process.env.PORT || 3000
    await connect(process.env.URL)
    app.listen(port, () => {
      console.log(`server is running on port ${port}`)
    })
  } catch (error) {
    console.log(error.message)
  }
}

start()
