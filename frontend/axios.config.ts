import axios, { AxiosInstance } from "axios"

const isProduction = process.env.NODE_ENV === "production"
const baseUrl = isProduction
  ? process.env.NEXT_PUBLIC_BACKEND_BASE_URL // Set your production base URL
  : process.env.NEXT_PUBLIC_BACKEND_LOCAL_BASE_URL // Set your development base URL

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl, // Set your base URL
  withCredentials: true,
})

export default axiosInstance
