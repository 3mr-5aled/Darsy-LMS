import axios from "axios"

const isProduction = process.env.NODE_ENV === "production"
const baseUrl = isProduction
  ? process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "" // Set your production base URL
  : `http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}` // Set your development base URL

console.log("baseUrl:", baseUrl) // Add this line to log the baseUrl

const axiosInstance = axios.create({
  baseURL: `${baseUrl}/api/v1/`, // Set your base URL
  withCredentials: true,
})

export default axiosInstance
