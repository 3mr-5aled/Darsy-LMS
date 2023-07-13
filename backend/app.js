const express = require("express")
const cors = require("cors")
const cookie = require("cookie-parser")
const authrouter = require("./routers/auth")
const errorhandler = require("./middlewares/errorhandler")
const { connect } = require("mongoose")
require("dotenv").config()

const app = express()

const corssettings = {
  origin: "http://localhost:8080",
  credential: true,
}
// middlewares

app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
)
app.use(cookie())

// routes

app.use("/api/v1/auth", authrouter)
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
