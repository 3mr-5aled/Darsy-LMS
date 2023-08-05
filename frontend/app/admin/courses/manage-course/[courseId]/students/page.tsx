"use client"
import React, { useEffect, useState } from "react"
import axiosInstance from "@/axios.config"
import { useParams } from "next/navigation"
import { UserType } from "@/common.types"
import { toast } from "react-toastify"
import Loading from "@/app/loading"
import CourseStudentCard from "@/components/CourseStudentCard"

const CourseStudentsPage: React.FC = () => {
  const { courseId } = useParams()
  const [enrolledStudents, setEnrolledStudents] = useState<UserType[]>([])
  const [unEnrolledStudents, setUnEnrolledStudents] = useState<UserType[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [newPaidAmount, setNewPaidAmount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchStudents = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(
        `/user/get-all-users?courseId=${courseId}`
      )
      setEnrolledStudents(response.data.enrolledUsers)
      setUnEnrolledStudents(response.data.unEnrolledUsers)
    } catch (error: any) {
      toast.error(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [courseId])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleAddStudent = async (userId: string, amount: number) => {
    if (!amount) return

    try {
      await axiosInstance.put(`/user/add-course-to-user/${userId}`, {
        courseId: courseId,
        amount: amount,
      })

      setNewPaidAmount(0)
      toast.success("user added")

      fetchStudents()
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemoveStudent = async (userId: string) => {
    try {
      await axiosInstance.put(`/user/remove-user-from-course/${userId}`, {
        courseId: courseId,
      })

      toast.success("user removed")
      fetchStudents()
    } catch (error) {
      console.error(error)
    }
  }

  const filteredEnrolledStudents = React.useMemo(
    () =>
      enrolledStudents.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [enrolledStudents, searchTerm]
  )

  const filteredUnEnrolledStudents = React.useMemo(
    () =>
      unEnrolledStudents.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [unEnrolledStudents, searchTerm]
  )

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Course Students Page</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Enrolled Students</h2>
            <ul className="space-y-4">
              {filteredEnrolledStudents.map((student) => (
                <CourseStudentCard
                  key={student._id}
                  student={student}
                  handleAddStudent={handleAddStudent}
                  handleRemoveStudent={handleRemoveStudent}
                  isEnrolled={true}
                />
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Unenrolled Students</h2>
            <ul className="space-y-4">
              {filteredUnEnrolledStudents.map((student) => (
                <CourseStudentCard
                  key={student._id}
                  student={student}
                  handleAddStudent={handleAddStudent}
                  handleRemoveStudent={handleRemoveStudent}
                  isEnrolled={false}
                />
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

export default CourseStudentsPage
