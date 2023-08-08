import axios from "axios"

const isProduction = process.env.NODE_ENV === "production"
const baseUrl = isProduction
  ? process.env.NEXT_PUBLIC_BACKEND_BASE_URL || ""
  : `http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}`

console.log(baseUrl)

const axiosInstance = axios.create({
  baseURL: `${baseUrl}/api/v1/`, // Set your base URL
  withCredentials: true,
})

export default axiosInstance
