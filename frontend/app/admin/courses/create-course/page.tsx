"use client"

import CourseForm from "@/components/CourseForm"

export default function CreateCourse() {
  return (
    <div className="flexCenter">
      <CourseForm title="Create Course" type="create" />
    </div>
  )
}
