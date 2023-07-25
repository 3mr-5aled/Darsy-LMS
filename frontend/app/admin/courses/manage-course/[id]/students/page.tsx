import { useEffect, useState } from "react"
import axiosInstance from "@/axios.config"
import { useParams } from "next/navigation"

const CourseStudentsPage = () => {
  const { courseId } = useParams()
  const [students, setStudents] = useState([])
  const [sortedStudents, setSortedStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [newStudentEmail, setNewStudentEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Fetch students for the given course ID
    const fetchStudents = async () => {
      setIsLoading(true)
      try {
        const response = await axiosInstance.get(
          `/api/courses/${courseId}/students`
        )
        setStudents(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudents()
  }, [courseId])

  useEffect(() => {
    // Sort the students based on some criteria (e.g., by name)
    const sorted = [...students].sort((a, b) => a.name.localeCompare(b.name))
    setSortedStudents(sorted)
  }, [students])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleAddStudent = async () => {
    if (!newStudentEmail) return

    try {
      // Add student to the course using the API
      await axiosInstance.post(`/api/courses/${courseId}/add-student`, {
        email: newStudentEmail,
      })

      // Refresh the students list after adding
      setNewStudentEmail("")
      fetchStudents()
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemoveStudent = async (studentId) => {
    try {
      // Remove student from the course using the API
      await axiosInstance.post(`/api/courses/${courseId}/remove-student`, {
        studentId,
      })

      // Refresh the students list after removal
      fetchStudents()
    } catch (error) {
      console.error(error)
    }
  }

  const filteredStudents = sortedStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1>Course Students Page</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
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
                <li key={student.id}>
                  {student.name}
                  <button onClick={() => handleRemoveStudent(student.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter student email..."
              value={newStudentEmail}
              onChange={(e) => setNewStudentEmail(e.target.value)}
            />
            <button onClick={handleAddStudent}>Add Student</button>
          </div>
        </>
      )}
    </div>
  )
}

export default CourseStudentsPage
