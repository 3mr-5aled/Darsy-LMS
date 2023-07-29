"use client"
import axiosInstance from "@/axios.config"
import { MembershipType } from "@/common.types"
import useUser from "@/lib/FetchUser"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

const Membership = () => {
  const [user] = useUser()
  const [membershipData, setMembershipData] = useState<MembershipType[]>([])
  const [selectedGrade, setSelectedGrade] = useState("all")
  const [uniqueGrades, setUniqueGrades] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        const response = await axiosInstance.get("/member/get-all-members/all")
        const sortedData = response.data.sort((a, b) =>
          a.grade.localeCompare(b.grade)
        )
        setMembershipData(sortedData)
        // Extract unique grades from the membership data
        const gradesSet = new Set(
          response.data.map((membership) => membership.grade)
        )
        const gradesArray = Array.from(gradesSet)
        setUniqueGrades(gradesArray)
      } catch (error) {
        console.error("Error while fetching membership data:", error)
      }
    }

    fetchMembershipData()
  }, [])

  // If the user exists, set the filter to their grade
  useEffect(() => {
    if (user) {
      setSelectedGrade(user.grade)
    }
  }, [user])

  // If the user exists, filter by their grade directly
  const filteredMembershipData = user
    ? membershipData.filter((membership) => membership.grade === selectedGrade)
    : selectedGrade === "all"
    ? membershipData
    : []

  const handleSubscribe = async (membershipId: string) => {
    try {
      const response = await axiosInstance.get(
        `/user/add-member-to-user/${membershipId}`
      )
      router.push(response.data.url) // Redirect to the URL received from the server
    } catch (error: any) {
      console.error("Error while subscribing:", error)
      toast.error(error.response.message)
    }
  }

  return (
    <div>
      <h1 className="my-5 text-4xl font-bold text-center underline">
        Membership
      </h1>
      <div className="max-w-5xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        {user ? (
          // Render the grade of the user if they exist
          <div className="mb-5 text-xl font-medium text-center">
            Your Grade:{" "}
            <span className="capitalize text-warning">{selectedGrade}</span>
          </div>
        ) : (
          // Render the select filter if the user does not exist
          <select
            title="filter"
            className="w-full p-3 mb-5 border rounded-md"
            value={selectedGrade} // Set the value to selectedGrade, not membershipData
            onChange={(e) => setSelectedGrade(e.target.value)}
          >
            <option value="all">All Grades</option>
            {uniqueGrades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center lg:grid-cols-3 md:gap-8">
          {filteredMembershipData.map((membership) => (
            <div
              key={membership._id}
              className={`flex flex-col items-center justify-between h-full p-6 border bg-base-300 shadow-sm rounded-2xl ring-1 sm:order-last sm:px-8 lg:p-12 ${
                membership.name.toLowerCase().includes("golden")
                  ? "border-amber-400"
                  : membership.name.toLowerCase().includes("platinum")
                  ? "border-cyan-500"
                  : membership.name.toLowerCase().includes("diamond")
                  ? "border-blue-500"
                  : ""
              }`}
            >
              <div className="text-center">
                <h2
                  className={`text-lg font-medium ${
                    membership.name.toLowerCase().includes("golden")
                      ? "text-amber-400"
                      : membership.name.toLowerCase().includes("platinum")
                      ? "text-cyan-500"
                      : membership.name.toLowerCase().includes("diamond")
                      ? "text-blue-500"
                      : ""
                  }`}
                >
                  {membership.name}
                  <span className="sr-only">Plan</span>
                </h2>

                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-success sm:text-4xl">
                    {membership.price}
                    {"$ "}
                  </strong>

                  <span className="text-sm font-medium">
                    /{membership.expiredTime} days
                  </span>
                </p>
              </div>
              <div className="p-3 mt-6 font-bold capitalize rounded-full text-warning bg-base-100">
                {membership.grade}
              </div>
              <div className="mt-6 space-y-2">{membership.description}</div>
              <button
                onClick={() => handleSubscribe(membership?._id)} // Pass the membership ID to the handler
                className={`block w-full px-12 py-3 mt-8 text-sm font-medium transition-all text-center border rounded-full focus:outline-none focus:ring active:text-blue-600 ${
                  membership.name.toLowerCase().includes("golden")
                    ? "border-amber-400 hover:bg-amber-400"
                    : membership.name.toLowerCase().includes("platinum")
                    ? "border-cyan-500 hover:bg-cyan-500"
                    : membership.name.toLowerCase().includes("diamond")
                    ? "border-blue-500 hover:bg-blue-500"
                    : ""
                }`}
              >
                Subscribe now
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full p-12 flexCenter bg-base-300 ">
        <button className="text-3xl btn btn-primary">Contact us</button>
      </div>
    </div>
  )
}

export default Membership
