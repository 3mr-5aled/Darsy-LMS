"use client"
import { useEffect, useState } from "react"
import axiosInstance from "@/axios.config"
import { useParams } from "next/navigation"
import { UserType } from "@/common.types"
import { toast } from "react-toastify"
import Loading from "@/app/loading"

const CourseStudentsPage = () => {
  const { courseId } = useParams()
  const [students, setStudents] = useState<UserType[]>([])
  // const [sortedStudents, setSortedStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [newPaidAmount, setNewPaidAmount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchStudents = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(
        `/user/get-all-users?courseId=${courseId}`
      )
      setStudents(response.data)
    } catch (error: any) {
      toast.error(error.message) // Pass the error message to toast.error
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

  const handleAddStudent = async (userId: string) => {
    if (!newPaidAmount) return

    try {
      // Add student to the course using the API
      await axiosInstance.post(`/user/add-course-to-user/${userId}`, {
        courseId: courseId,
        amount: newPaidAmount,
      })

      // Refresh the students list after adding
      setNewPaidAmount(0)
      fetchStudents()
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemoveStudent = async (userId: string) => {
    try {
      // Remove student from the course using the API
      await axiosInstance.post(`/users/remove-user-from-course/${userId}`, {
        courseId,
      })

      // Refresh the students list after removal
      fetchStudents()
    } catch (error) {
      console.error(error)
    }
  }

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            />
          </div>
          <div>
            <ul>
              {filteredStudents.map((student) => (
                <li
                  key={student._id}
                  className="flex items-center justify-between mb-2"
                >
                  <span>{student.name}</span>
                  {studentEnrolled ? (
                    <button onClick={() => handleRemoveStudent(student._id)}>
                      Remove
                    </button>
                  ) : (
                    <div>
                      <input
                        type="number"
                        placeholder="Enter Amount paid ..."
                        className="input input-bordered"
                        value={newPaidAmount}
                        onChange={(e) => setNewPaidAmount(+e.target.value)}
                      />
                      <button onClick={() => handleAddStudent(student._id)}>
                        Add Student
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

export default CourseStudentsPage
