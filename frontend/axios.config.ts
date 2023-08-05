import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1/", // Set your base URL
  // headers: {
  //   "Content-Type": "application/json",
  //   // Set other headers if needed
  // },
  withCredentials: true,
})

export default axiosInstance
