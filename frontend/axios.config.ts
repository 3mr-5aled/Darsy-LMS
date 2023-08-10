import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

const isProduction = process.env.NODE_ENV === "production"
const baseUrl = isProduction
  ? `https://darsy-lms-7ni9.onrender.com` // Set your production base URL
  : `http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}` // Set your development base URL

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${baseUrl}/api/v1/`, // Set your base URL
  withCredentials: true,
})

// Interceptor to include CSRF token in requests
axiosInstance.interceptors.request.use((config) => {
  // Assuming your CSRF token is stored in a cookie named "csrfToken"
  const csrfToken = getCookie("csrfToken")

  if (csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken
  }

  return config
})

// Helper function to get cookies
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}

export default axiosInstance
