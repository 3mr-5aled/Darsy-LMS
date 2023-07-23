"use client"
import Loading from "@/app/loading"
import axiosInstance from "@/axios.config"
import { UserType } from "@/common.types"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const StudentPage = () => {
  const router = useRouter()
  const { id } = useParams()
  const [user, setUser] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const goBack = () => {
    router.back()
  }

  useEffect(() => {
    // Fetch user from the API
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get<UserType>(
          `/user/get-user/${id}`
        )
        // @ts-ignore
        setUser(response.data.user)
        setIsLoading(false)
      } catch (error: any) {
        setError("An error occurred while fetching user.")
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [id])

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      // Make an API call to delete the user based on the ID
      await axiosInstance.delete(`/user/delete-user/${id}`)
      toast.success("user deleted successfully")
      router.push("/admin/students")
      // Redirect to a different page or show a success message
      setIsLoading(false)
    } catch (error) {
      setError("An error occurred while deleting the user.")
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="p-5 m-5">
      <div className="mb-8 prose text-center">
        <h1>Student Details</h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="font-bold">Name:</div>
        <div>{user?.name}</div>

        <div className="font-bold">Email:</div>
        <div>{user?.email}</div>

        <div className="font-bold">Phone:</div>
        <div>{user?.phone}</div>

        <div className="font-bold">Parents' Phone:</div>
        <div>{user?.parentsPhone}</div>

        <div className="font-bold">Date of Birth:</div>
        <div>{user?.dateOfBirth}</div>

        <div className="font-bold">Role:</div>
        <div>{user?.role}</div>

        <div className="font-bold">Gender:</div>
        <div>{user?.gender}</div>

        <div className="font-bold">Grade:</div>
        <div>{user?.grade}</div>
        <div className="font-bold">City:</div>
        <div>{user?.city}</div>
      </div>
      <div className="flex justify-center mt-5 space-x-4">
        <button type="button" className="btn btn-secondary" onClick={goBack}>
          Back
        </button>
        <Link href={`/admin/students/edit-student/${id}`} passHref>
          <button className="btn btn-primary">Edit</button>
        </Link>
        <button className="btn btn-error" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default StudentPage
