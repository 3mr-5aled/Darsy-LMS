"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import axiosInstance from "@/axios.config"
import { UserType } from "@/common.types"
import Loading from "@/app/loading"

const Students = () => {
  const [users, setUsers] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("") // Step 1: Add search term state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get<any>("/user/get-all-users")
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

  // Step 3: Filter users based on the search term
  const filteredUsers = users.filter((user: any) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-5 m-5">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Students</h1>
      </div>

      {/* Step 2: Add search input */}
      <input
        type="text"
        placeholder="Search students..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-3 rounded-md"
      />

      {filteredUsers.length > 0 ? (
        filteredUsers.map((user: UserType, index: number) => (
          <Link
            key={user._id}
            href={`/admin/students/manage-student/${user._id}`}
            className="flex flex-row items-center justify-between w-full p-3 rounded-md hover:bg-base-100 min-w-lg"
          >
            <h3 className="pr-5 text-lg font-bold">
              {index + 1}
              {". "} {user.name}
            </h3>
            <div className="flex flex-row items-center gap-3">
              <p className="p-3 rounded-full bg-base-100">
                {user.membership ? user.membership.name : "No subscription"}
              </p>
              <p className="text-success">{user.email}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No students found.</p>
      )}
    </div>
  )
}

export default Students
