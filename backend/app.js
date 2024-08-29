const express = require("express")
const cors = require("cors")
const hpp = require("hpp")
const cookie = require("cookie-parser")
const authRrouter = require("./routers/auth")
const errorhandler = require("./middlewares/errorhandler")
const { connect } = require("mongoose")
const courseRouter = require("./routers/course")
const { xss } = require("express-xss-sanitizer")
const mongoSanitize = require("express-mongo-sanitize")
const sectionRouter = require("./routers/section")
const lessonRouter = require("./routers/lesson")
const paymentRouter = require("./routers/payment")
const uploadImage = require("./middlewares/imageupload")
const examRouter = require("./routers/exam")
const payment = require("./middlewares/paytaps")
const bodyParser = require("body-parser")
// const fileUploader = require('express-fileupload')
const helmet = require("helmet")
const compression = require('compression')
const uploaderRouter = require("./routers/uploader")
const userRouter = require("./routers/user")
const memberRouter = require("./routers/member")
const { getAnalysis, getMoneyPerPeriod } = require("./controllers/analysis")
const authorization = require("./middlewares/authorization")
const rateLimit = require("express-rate-limit")
const authintication = require("./middlewares/authintication")
const ApiError = require("./utils/apierror");
const ownerRouter = require("./routers/owner");
require("dotenv").config()
const app = express()
const isProduction = process.env.NODE_ENV === "production"
const baseUrl = isProduction
  ? "https://darsy-lms-beta.vercel.app"
  : `http://localhost:8080`
app.use(
  cors({
    origin: baseUrl,
    credentials: true,
  })
)
app.use(compression())
app.use(cookie())
// Increase payload limit to 10 kb
const imageSize = bodyParser.json({ limit: "5mb" })
const imageSizeUrl = bodyParser.urlencoded({ limit: "5mb", extended: true })
const textSize = bodyParser.json({ limit: "10kb" })
app.use(hpp())
app.use(mongoSanitize())
app.use(xss())
app.use(helmet.xPoweredBy())
// const csrfProtection = csrf({ cookie: true })
// middlewares
// axios.defaults.baseurl=
// axios.defaults.withcredintials=true
// app.use(fileUploader())
// routes
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  message: "Too many requests from this IP, please try again after 5 minutes",
})
app.use("/api/v1/auth", textSize, /*csrfProtection,*/ limiter, authRrouter)
app.use("/api/v1/course", textSize, courseRouter)
app.use("/api/v1/section", textSize, sectionRouter)
app.use("/api/v1/lesson", textSize, lessonRouter)
app.use("/api/v1/payment", textSize, /*csrfProtection,*/ paymentRouter)
app.use("/api/v1/exam", textSize, /*csrfProtection,*/ examRouter)
app.use("/api/v1/upload", imageSizeUrl, imageSize, uploaderRouter)
app.use("/api/v1/user", textSize, userRouter)
app.use("/api/v1/owner", textSize, ownerRouter)
app.use("/api/v1/member", textSize, memberRouter)
app.get(
  "/api/v1/analysis",
  textSize,
  authintication,
  authorization,
  getAnalysis
)
app.get(
  "/api/v1/total-money-per-period",
  textSize,
  authintication,
  authorization,
  getMoneyPerPeriod
)
app.use((req, res, next) => {
  res.status(404).json({ message: "This api is not found" })
})
app.use(errorhandler)
const start = async () => {
  try {
    port = process.env.PORT || 3000
    await connect(process.env.URL)
    app.listen(3000, () => {
      console.log(`server is running on port ${port}`)
    })
  } catch (error) {
    console.log(error.message)
  }
}
start()
