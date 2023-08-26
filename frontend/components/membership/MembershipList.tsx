"use client"
import axiosInstance from "@/axios.config"
import { MembershipType } from "@/common.types"
import ConfirmModal from "@/components/Features/ConfirmModal"
import DataLoading from "@/components/Features/DataLoading"
import Loading from "@/app/loading"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useUserContext } from "@/contexts/userContext"
import Link from "next/link"
import PremiumOnlyRoute from "@/components/Routes/PremiumOnlyRoute"
import { Owner } from "@/constant"
import NotFoundComponent from "../Features/NotFoundComponent"

const MembershipList = () => {
  const { state } = useUserContext()
  const { user } = state
  const router = useRouter()

  const [membershipData, setMembershipData] = useState<MembershipType[]>([])
  const [uniqueGrades, setUniqueGrades] = useState<string[]>([])
  const [selectedGrade, setSelectedGrade] = useState("all")
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [amountError, setAmountError] = useState("")
  const [selectedMembership, setSelectedMembership] =
    useState<MembershipType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true) // Add loading state

  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        const response = await axiosInstance.get<MembershipType[]>(
          "/member/get-all-members/all"
        )
        const sortedData = response.data.sort((a, b) =>
          a.grade.localeCompare(b.grade)
        )
        setMembershipData(sortedData)
        const gradesSet = new Set(
          response.data.map((membership) => membership.grade)
        )
        const gradesArray = Array.from(gradesSet)
        setUniqueGrades(gradesArray)
        setLoading(false) // Set loading to false when data is loaded
      } catch (error) {
        console.error("Error while fetching membership data:", error)
        setError("Memberships not found")
        setLoading(false) // Set loading to false on error
        // setError(error.response.data.message);
        // toast.error("Error while fetching membership data");
      }
    }

    fetchMembershipData()
  }, [])

  useEffect(() => {
    if (user) {
      setSelectedGrade(user.grade)
    }
  }, [user])

  const filteredMembershipData = user
    ? membershipData.filter((membership) => membership.grade === selectedGrade)
    : selectedGrade === "all"
    ? membershipData
    : membershipData.filter((membership) => membership.grade === selectedGrade)

  const handleSubscribe = async (membershipId: string) => {
    try {
      const response = await axiosInstance.put(
        `/user/add-member-to-user/${membershipId}`
      )
      router.push(response.data.url)
    } catch (error: any) {
      console.error("Error while subscribing:", error)
      toast.error(
        `Error ${error.response.data.err.errCode} while subscribing: ${error.response.data.message}`
      )
    }
  }

  const handleSubscribeConfirm = async () => {
    try {
      if (selectedMembership) {
        const response = await axiosInstance.put(
          `/user/add-member-to-user/${selectedMembership._id}`
        )
        router.push(response.data.url)
      }
      setShowConfirmModal(false)
    } catch (error: any) {
      console.error("Error while subscribing:", error)
      toast.error(
        `Error ${error.response.data.err.errCode} while subscribing: ${error.response.data.message}`
      )
    }
  }

  const handleCloseModal = () => {
    setShowConfirmModal(false)
    setSelectedMembership(null)
  }

  const handleOpenCreditModal = () => {
    setIsCreditModalOpen(true)
  }

  const handleCloseCreditModal = () => {
    setIsCreditModalOpen(false)
  }

  const handleAddCredit = async () => {
    const isValidAmount = /^[0-9]*(\.[0-9]{1,2})?$/.test(amount)

    if (!isValidAmount || parseFloat(amount) <= 0 || parseFloat(amount) > 250) {
      setAmountError(
        "Invalid amount. Please enter a valid value between 0 and 250."
      )
      return
    }

    try {
      const response = await axiosInstance.post(`/payment/add-credit/`, {
        amount: parseFloat(amount),
      })
      router.push(response.data.url)
      setAmount("")
      handleCloseModal()
    } catch (error) {
      toast.error("Payment failed. Please try again.")
      console.log(error)
    }
  }

  return (
    <PremiumOnlyRoute feature="membership">
      <div>
        <h1 className="my-5 text-4xl font-bold text-center underline">
          Membership
        </h1>
        <div className="max-w-5xl px-4 py-4 mx-auto">
          {loading ? ( // Display loading indicator while loading
            <Loading />
          ) : error ? (
            <NotFoundComponent message={error} />
          ) : user ? (
            <>
              <DataLoading
                data={user}
                loadingTime={100}
                message="User Not Found"
              >
                <div className="flex flex-row items-center gap-3 justify-center">
                  <div className="mb-5 text-xl font-medium text-center">
                    Your Grade:{" "}
                    <span className="capitalize text-warning">
                      {selectedGrade}
                    </span>
                  </div>
                  <div className="mb-5 text-xl font-medium text-center">
                    Your Credit:{" "}
                    <span className="capitalize text-success">
                      {user?.credit} $
                    </span>
                  </div>
                </div>
                <p className="text-center text-error mb-3">
                  If your credit is less than the membership price, please
                  consider charging it with the suitable amount first.
                </p>
              </DataLoading>
            </>
          ) : (
            <select
              title="filter"
              className="w-full p-3 mb-5 border rounded-md select select-bordered"
              value={selectedGrade}
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
          <DataLoading
            data={membershipData}
            loadingTime={100}
            message="Memberships Not Found"
          >
            <div className="my-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center lg:grid-cols-3 md:gap-8">
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
                  {user ? (
                    user?.credit && membership.price > user.credit ? (
                      <button
                        className={`btn mt-5 ${
                          membership.name.toLowerCase().includes("golden")
                            ? "border-amber-400 hover:bg-amber-400 hover:text-white"
                            : membership.name.toLowerCase().includes("platinum")
                            ? "border-cyan-500 hover:bg-cyan-500 hover:text-white"
                            : membership.name.toLowerCase().includes("diamond")
                            ? "border-blue-500 hover:bg-blue-500 hover:text-white"
                            : ""
                        } `}
                        onClick={() => {
                          handleOpenCreditModal()
                          setSelectedMembership(membership)
                        }}
                        disabled={
                          !!(
                            user?.membership?.memberId &&
                            new Date(user.membership.expireTime) >= new Date()
                          )
                        }
                      >
                        {user?.membership?.memberId &&
                        new Date(user.membership.expireTime) >= new Date()
                          ? "You are already subscribed"
                          : "Add Credit"}
                      </button>
                    ) : (
                      <button
                        className={`btn mt-5 ${
                          membership.name.toLowerCase().includes("golden")
                            ? "border-amber-400 hover:bg-amber-400 hover:text-white"
                            : membership.name.toLowerCase().includes("platinum")
                            ? "border-cyan-500 hover:bg-cyan-500 hover:text-white"
                            : membership.name.toLowerCase().includes("diamond")
                            ? "border-blue-500 hover:bg-blue-500 hover:text-white"
                            : ""
                        } `}
                        onClick={() => {
                          setShowConfirmModal(true)
                          setSelectedMembership(membership)
                        }}
                        disabled={
                          !!(
                            user?.membership?.memberId &&
                            new Date(user.membership.expireTime) >= new Date()
                          )
                        }
                      >
                        {user?.membership?.memberId &&
                        new Date(user.membership.expireTime) >= new Date()
                          ? "You are already subscribed"
                          : "Subscribe now"}
                      </button>
                    )
                  ) : (
                    <button
                      className="mt-5 btn btn-primary"
                      onClick={() => router.push("/auth/login")}
                    >
                      Sign In to Subscribe
                    </button>
                  )}
                  {showConfirmModal && (
                    <ConfirmModal
                      title="Confirm Subscription"
                      handleClick={handleSubscribeConfirm}
                      handleClose={handleCloseModal}
                    >
                      {selectedMembership && (
                        <>
                          <p>
                            your credit:{" "}
                            <span className="text-secondary font-bold">
                              {user?.credit} $
                            </span>
                          </p>
                          <p>
                            Are you sure you want to subscribe to{" "}
                            <strong className="text-success">
                              {selectedMembership.name}
                            </strong>{" "}
                            for{" "}
                            <strong className="text-warning">
                              {selectedMembership.price}$
                            </strong>
                            ?
                          </p>
                        </>
                      )}
                    </ConfirmModal>
                  )}
                  {isCreditModalOpen &&
                    (!Owner.premium.paytabs ? (
                      <ConfirmModal
                        title="Enter the amount you want to charge"
                        handleClose={handleCloseCreditModal}
                      >
                        <p className="py-4">
                          Please Contact the support team to add credit
                        </p>
                      </ConfirmModal>
                    ) : (
                      <ConfirmModal
                        title="Enter the amount you want to charge"
                        handleClick={handleAddCredit}
                        handleClose={handleCloseCreditModal}
                      >
                        <input
                          type="text"
                          placeholder={
                            selectedMembership?.price.toString() ?? ""
                          }
                          className={`w-full mb-4 input input-bordered ${
                            amountError ? "input-error" : ""
                          }`}
                          value={amount}
                          onChange={(e) => {
                            setAmount(e.target.value)
                            setAmountError("")
                          }}
                          min="0"
                          max="250"
                          pattern="^[0-9]*(\.[0-9]{1,2})?$"
                        />
                        {amountError && (
                          <p className="text-error">{amountError}</p>
                        )}
                      </ConfirmModal>
                    ))}
                </div>
              ))}
            </div>
          </DataLoading>
        </div>
        <div className="w-full p-12 flexCenter bg-base-300 ">
          <Link href="/contact" className="text-3xl btn btn-primary">
            Contact us
          </Link>
        </div>
      </div>
    </PremiumOnlyRoute>
  )
}

export default MembershipList
