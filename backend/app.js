const express = require("express")
const cors = require("cors")
const cookie = require("cookie-parser")
const authRrouter = require("./routers/auth")
const errorhandler = require("./middlewares/errorhandler")
const { connect } = require("mongoose")
const courseRouter = require("./routers/course")
const sectionRouter = require("./routers/section")
const lessonRouter = require("./routers/lesson")
const paymentRouter = require("./routers/payment")
const uploadImage = require("./middlewares/imageupload")
const examRouter = require("./routers/exam")
const payment = require("./middlewares/paytaps")
const bodyParser = require("body-parser")
// const fileUploader = require('express-fileupload')
const uploaderRouter = require("./routers/uploader")
const userRouter = require("./routers/user")
const memberRouter = require("./routers/member")
const { getAnalysis, getMoneyPerPeriod } = require("./controllers/analysis")
const authorization = require("./middlewares/authorization")
const authintication = require("./middlewares/authintication")
require("dotenv").config()
const app = express()

// Increase payload limit to 10 MB
app.use(bodyParser.json({ limit: "10mb" }))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }))

// middlewares
// axios.defaults.baseurl=
// axios.defaults.withcredintials=true

app.use(express.json())
// app.use(fileUploader())
const isProduction = process.env.NODE_ENV === "production"
const baseUrl = isProduction
  ? "https://darsy-lms-7ni9.onrender.com"
  : `http://localhost:8080`

app.use(
  cors({
    origin: baseUrl,
    credentials: true,
  })
)
app.use(cookie())

// routes

app.use("/api/v1/auth", authRrouter)
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/section", sectionRouter)
app.use("/api/v1/lesson", lessonRouter)
app.use("/api/v1/payment", paymentRouter)
app.use("/api/v1/exam", examRouter)
app.use("/api/v1/upload", uploaderRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/member", memberRouter)
app.get("/api/v1/analysis", authintication, authorization, getAnalysis)
app.get(
  "/api/v1/total-money-per-period",
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
    app.listen(port, () => {
      console.log(`server is running on port ${port}`)
    })
  } catch (error) {
    console.log(error.message)
  }
}
start()
