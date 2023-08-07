import axios from "axios"

const isProduction = process.env.NODE_ENV === "production"
const baseUrl = isProduction
  ? process.env.NEXT_PUBLIC_BACKEND_BASE_URL || ""
  : "http://localhost:3000"

const axiosInstance = axios.create({
  baseURL: `${baseUrl}/api/v1/`, // Set your base URL
  // headers: {
  //   "Content-Type": "application/json",
  //   // Set other headers if needed
  // },
  withCredentials: true,
})

export default axiosInstance
