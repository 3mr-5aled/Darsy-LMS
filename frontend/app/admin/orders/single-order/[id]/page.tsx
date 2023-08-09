"use client"
import { useState } from "react"
import SingleOrder from "@/components/orders/SingleOrder"

const Students = () => {
  const [users, setUsers] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("") // Step 1: Add search term state

  // Step 3: Filter users based on the search term

  return (
    <>
      <SingleOrder />
    </>
  )
}

export default Students
