const express = require("express")
const cors = require("cors")
const { spawn } = require('child_process');
const path = require('path')
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
const router = require("./routers/backup");
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
app.use("/api/v1/member", textSize, memberRouter)
app.use("/api/v1/backup", textSize, router)
app.get(
  "/api/v1/analysis",
  textSize,
  authintication,
  authorization,
  /*csrfProtection,*/ getAnalysis
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
const db_name = 'chat-app'
const archive = `${path.join(__dirname, `/${db_name}.gzip`)}`
const restoreBackup = () => {
  const restoreChild = spawn('C:/Program Files/MongoDB/Tools/100/bin/mongorestore', [
    `--uri=${process.env.URL_BACKUP}`,
    `--db=${db_name}`,
    `--archive=${archive}`,
    `--gzip`,
  ]);

  restoreChild.stdout.on('data', (data) => {
    console.log('Restore stdout:\n', data);
  });

  restoreChild.stderr.on('data', (data) => {
    console.log('Restore stderr:\n', Buffer.from(data).toString());
  });

  restoreChild.on('error', (error) => {
    console.log('Restore error:\n', error.message, error.stack);
  });

  restoreChild.on('exit', (code, signal) => {
    if (code) console.log('Restore process exit with code:', code);
    else if (signal) console.log('Restore process killed with signal:', signal);
    else console.log('Restore is successful ✅');
  });
};

const backup = function () {
  const child = spawn('C:/Program Files/MongoDB/Tools/100/bin/mongodump', [
    `--uri=${process.env.URL_BACKUP}`,
    `--db=${db_name}`,
    `--archive=${archive}`,
    '--gzip',
  ])
  child.stdout.on('data', (data) => {
    console.log('stdout:\n', data);
  });
  child.stderr.on('data', (data) => {
    console.log('stderr:\n');
  });
  child.on('error', (error) => {
    console.log('error:\n',error);
  });
  child.on('exit', (code, signal) => {
    if (code) console.log('Process exit with code:', code);
    else if (signal) console.log('Process killed with signal:', signal);
    else {
      console.log('success')
    }
  });
}
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
