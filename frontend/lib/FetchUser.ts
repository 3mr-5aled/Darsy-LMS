import { useState, useEffect } from "react"
import axiosInstance from "@/axios.config"
import { toast } from "react-toastify"
import { UserType } from "@/common.types"

const useUser = (): [UserType | null, boolean] => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<UserType | null>(null)

  const fetchUser = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get("/auth/profile")
      const userData = response.data // Assuming the response data is the user object
      setUser(userData)
      setIsLoading(false)
    } catch (error: any) {
      toast.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return [user, isLoading]
}

export default useUser
