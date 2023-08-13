"use client"
import axiosInstance from "@/axios.config"
import { useUserContext } from "@/contexts/userContext"
import { useEffect } from "react"
import { toast } from "react-toastify"

const FetchUserOnLoad = () => {
  const { setUser } = useUserContext()

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/auth/profile")
      const userData = response.data // Assuming the response data is the user object
      setUser(userData)
    } catch (error: any) {
      toast.error(error)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchUser()
    }
  }, [])

  return null
}

export default FetchUserOnLoad
