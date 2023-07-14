import { toast } from "react-toastify"
import axiosInstance from "@/axios.config"
import { UserType } from "@/common.types"
import { useEffect, useState } from "react"

const useUser = (): [UserType | null, boolean, any] => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useState<UserType | null>(null)

  const fetchUser = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get("/auth/profile")
      const user = response.data // Assuming the response data is the user object
      setUser(user)
      setIsLoading(false)
    } catch (error: any) {
      toast.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return [user, isLoading, setUser]
}

export default useUser
