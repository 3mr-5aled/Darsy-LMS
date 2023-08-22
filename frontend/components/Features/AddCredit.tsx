import React, { useState } from "react"
import { toast } from "react-toastify"
import axiosInstance from "@/axios.config"
import { Owner } from "@/constant"

type CreditModalProps = {
  isOpen: boolean
  onClose: () => void
  onAddCredit: (amount: number) => void
  studentId: string
}

const AddCredit: React.FC<CreditModalProps> = ({
  isOpen,
  onClose,
  onAddCredit,
  studentId,
}) => {
  const [creditAmount, setCreditAmount] = useState<number>(0)
  const [creditError, setCreditError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false) // State variable for loading status

  const handleAddCredit = async () => {
    // Validate the creditAmount input
    if (isNaN(creditAmount) || creditAmount < -250 || creditAmount > 250) {
      setCreditError("Invalid credit amount. -250 < number < 250")
      return
    }

    setLoading(true) // Set loading to true when API call starts

    try {
      // Make an API call to add credit to the user based on the ID
      await axiosInstance.post(`/user/edit-credit/${studentId}`, {
        amount: creditAmount,
      })
      toast.success("Credit added successfully")
      onAddCredit(creditAmount)
      onClose()
    } catch (error) {
      toast.error("An error occurred while adding credit.")
      console.log(error)
    }

    setLoading(false) // Set loading back to false after the API call is completed
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-8 rounded-lg bg-base-100">
        <h2 className="mb-4 text-xl font-bold">Add Credit</h2>
        {!Owner.premium.paytabs ? (
          <>
            <p className="mb-4 text-sm">Contact us to add credit</p>
            <button
              className="mr-2 btn btn-secondary"
              onClick={() => onClose()}
              disabled={loading} // Disable the button when loading is true
            >
              Close
            </button>
          </>
        ) : (
          <>
            <input
              type="number"
              value={creditAmount}
              min={-250}
              max={250}
              onChange={(e) => {
                setCreditAmount(Number(e.target.value))
                setCreditError("") // Clear any existing error when the user starts typing
              }}
              className={`w-full p-2 mb-4 border border-gray-300 rounded-md ${
                creditError ? "border-red-500" : ""
              }`}
              placeholder="Enter credit amount"
              disabled={loading} // Disable the input when loading is true
            />
            {creditError && (
              <p className="mb-4 text-sm text-red-500">{creditError}</p>
            )}
            <div className="flex justify-end">
              <button
                className="mr-2 btn btn-secondary"
                onClick={() => onClose()}
                disabled={loading} // Disable the button when loading is true
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={() => onAddCredit(creditAmount)}
                disabled={loading} // Disable the button when loading is true
              >
                {loading ? "Adding..." : "Add Credit"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AddCredit
