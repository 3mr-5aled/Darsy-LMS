"use client"

import CourseForm from "@/components/CourseForm"
import axiosInstance from "@/axios.config"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Loading from "@/app/loading"
import { MembershipType } from "@/common.types"
import MembershipForm from "@/components/MembershipForm"

export default function EditCourse() {
  const { membershipId } = useParams()
  const [membership, setMembership] = useState<MembershipType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await axiosInstance.get<MembershipType>(
          `/member/get-member/${membershipId}`
        )
        setMembership(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    fetchMemberships()
  }, [membershipId])

  if (isLoading) {
    return <Loading />
  }

  return (
    <MembershipForm
      title="Edit Membership"
      type="edit"
      membership={membership}
    />
  )
}
