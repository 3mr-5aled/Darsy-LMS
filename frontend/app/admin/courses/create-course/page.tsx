"use client"

import CourseForm from "@/components/Forms/CourseForm"

export default function CreateCourse() {
  return (
    <div className="flexCenter">
      <CourseForm title="Create Course" type="create" />
    </div>
  )
}
