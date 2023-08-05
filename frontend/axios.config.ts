import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://darsy-lms-7ni9.onrender.com/api/v1/", // Set your base URL
  // headers: {
  //   "Content-Type": "application/json",
  //   // Set other headers if needed
  // },
  withCredentials: true,
})

export default axiosInstance
