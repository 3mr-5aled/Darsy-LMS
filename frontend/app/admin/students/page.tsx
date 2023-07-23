"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import axiosInstance from "@/axios.config"
import { UserType } from "@/common.types"
import Loading from "@/app/loading"

const Students = () => {
  const [users, setUsers] = useState<any>([]) // Corrected the type annotation
  const [isLoading, setIsLoading] = useState<boolean>(true) // Added type annotation
  const [error, setError] = useState<string | null>(null) // Added type annotation

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get<any>("/user/get-all-users") // Corrected the response data type annotation
        setUsers(response.data)
        setIsLoading(false)
      } catch (error: any) {
        setError("An error occurred while fetching users.")
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="p-5 m-5">
      <div className="mb-8 prose text-center">
        <h1>Students</h1>
      </div>
      {users?.map((user: any) => {
        return (
          <Link
            key={user._id}
            href={`/admin/students/manage-student/${user._id}`}
            className="flex flex-row items-center justify-between w-full p-3 rounded-md hover:bg-base-100 min-w-lg"
          >
            <h3 className="pr-5 text-lg font-bold">{user.name}</h3>
            <p className="text-success">{user.email}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default Students
