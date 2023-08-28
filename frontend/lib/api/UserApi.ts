import { useUserContext } from "@/contexts/userContext"
import { cache } from "react"

export const revalidate = 3600 // revalidate the data at most every hour

export const getCurrentUser = cache(async () => {
  const { state } = useUserContext()
  const { user } = state
  return state
})
