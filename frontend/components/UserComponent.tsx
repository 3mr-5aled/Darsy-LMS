"use client"
import { useUserContext } from "@/contexts/userContext"

const UserComponent = () => {
  const { state, setUser, clearUser } = useUserContext()
  const { user } = state

  return <div>{user?.name}</div>
}

export default UserComponent
