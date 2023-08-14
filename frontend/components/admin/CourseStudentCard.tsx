import React, { useState } from "react"
import { UserType } from "@/common.types"

type CourseStudentCardProps = {
  student: UserType
  handleAddStudent: (userId: string, amount: number) => void
  handleRemoveStudent: (userId: string) => void
  isEnrolled: boolean
}

const CourseStudentCard: React.FC<CourseStudentCardProps> = ({
  student,
  handleAddStudent,
  handleRemoveStudent,
  isEnrolled,
}) => {
  const [newPaidAmount, setNewPaidAmount] = useState<number>(0)

  const isStudentEnrolled = isEnrolled

  const handleAddStudentWithAmount = () => {
    if (newPaidAmount > 0) {
      handleAddStudent(student._id, newPaidAmount)
      setNewPaidAmount(0)
    }
  }

  return (
    <li className="flex flex-row flex-wrap items-center justify-between gap-2 mb-2 border p-4 rounded-md bg-base-100 shadow-md">
      <span className="text-lg font-semibold">{student.name}</span>
      {isStudentEnrolled ? (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={() => handleRemoveStudent(student._id)}
        >
          Remove
        </button>
      ) : (
        <div className="flex flex-row gap-3 items-center flex-wrap w-fit">
          <input
            type="number"
            placeholder="Enter Amount paid ..."
            className="input input-bordered mr-2"
            value={newPaidAmount}
            onChange={(e) => setNewPaidAmount(+e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={handleAddStudentWithAmount}
          >
            Add Student
          </button>
        </div>
      )}
    </li>
  )
}

export default CourseStudentCard
