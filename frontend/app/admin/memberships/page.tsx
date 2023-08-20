"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import axiosInstance from "@/axios.config"
import Loading from "@/app/loading"
import { MembershipType } from "@/common.types" // Make sure to import MembershipType from the correct path
import { Options } from "@/constant"

const MembershipAdminView = () => {
  const [memberships, setMemberships] = useState<MembershipType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedGrade, setSelectedGrade] = useState<string>("") // Step 1: Add selectedGrade state

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await axiosInstance.get<MembershipType[]>(
          "/member/get-all-members/all"
        )
        setMemberships(response.data)
        setIsLoading(false)
      } catch (error: any) {
        setError("An error occurred while fetching memberships.")
        setIsLoading(false)
      }
    }

    fetchMemberships()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  // Step 3: Filter memberships based on the selected grade
  const filteredMemberships = selectedGrade
    ? memberships.filter((membership) => membership.grade === selectedGrade)
    : memberships

  return (
    <div className="p-5 m-5">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Memberships</h1>
      </div>

      {/* Step 2: Add grade filter selector */}
      <select
        title="grade"
        value={selectedGrade}
        onChange={(e) => setSelectedGrade(e.target.value)}
        className="mb-3 select select-bordered w-60"
      >
        <option value="">All Grades</option>
        {/* Replace the options below with the actual grade options */}
        {Options.GradeOption.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
        {/* Add more options as needed */}
      </select>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {filteredMemberships.length > 0 ? (
          filteredMemberships.map((membership) => (
            <Link
              key={membership._id}
              href={`/admin/memberships/manage-membership/${membership._id}/edit-membership`}
              className={`flex flex-col p-5 card hover:bg-base-100 ${
                membership.name.toLowerCase().includes("golden")
                  ? "border-2 border-amber-400"
                  : membership.name.toLowerCase().includes("platinum")
                  ? "border-2 border-cyan-500"
                  : membership.name.toLowerCase().includes("diamond")
                  ? "border-2 border-blue-600"
                  : ""
              }`}
            >
              <div className="flex flex-row">
                <span className="font-semibold text-warning">Name:</span>
                <p className="pl-2">{membership.name}</p>
              </div>
              <div className="">
                <span className="inline font-semibold text-warning">
                  Description:
                </span>
                <p className="inline pl-2">{membership.description}</p>
              </div>
              <div className="flex flex-row">
                <span className="font-semibold text-warning">Price:</span>
                <p className="pl-2">{membership.price}</p>
              </div>
              <div className="flex flex-row">
                <span className="font-semibold text-warning">Grade:</span>
                <p className="pl-2 text-success">{membership.grade}</p>
              </div>
              <div className="flex flex-row">
                <span className="font-semibold text-warning">Discount:</span>
                <p className="pl-2">{membership.discount}</p>
              </div>
              <div className="flex flex-row">
                <span className="font-semibold text-warning">Expire Time:</span>
                <p className="pl-2">{membership.expiredTime}</p>
              </div>
              <div className="flex flex-row">
                <span className="font-semibold text-warning">Disabled:</span>
                <p className="pl-2">{membership.disabled ? "true" : "false"}</p>
              </div>
              <div className="flex flex-row">
                <span className="font-semibold text-warning">
                  Number of students:
                </span>
                <p className="pl-2">{membership.userId?.length}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No Memberships found.</p>
        )}
      </div>
    </div>
  )
}

export default MembershipAdminView
