"use client"
import axiosInstance from "@/axios.config"
import router from "next/router"
import { useState } from "react"
import { BsPlusCircleFill } from "react-icons/bs"
import { toast } from "react-toastify"

interface WalletComponentProps {
  credit: number // Define the credit prop type
}

const WalletComponent = ({ credit }: WalletComponentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [amountError, setAmountError] = useState("")

  const handlePayment = async () => {
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
      // Handle the payment response as needed
      router.push(response.data.url)
      setAmount("")
      handleCloseModal()
    } catch (error) {
      toast.error("Payment failed. Please try again.")
      console.log(error)
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <span className="absolute top-0 left-0 p-3 opacity-80">My Wallet</span>
      <div className="p-3 pt-5 text-5xl font-bold">
        {credit}
        <span className="text-success">{" $"}</span>
      </div>
      {/* Step 3: Add modal trigger button */}
      <button
        className="flex flex-row items-center justify-center w-full gap-3 text-secondary"
        onClick={handleOpenModal}
      >
        <div>Charge your credit</div>{" "}
        <span className="rounded-full text-success">
          <BsPlusCircleFill />
        </span>
      </button>
      {isModalOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-70">
          <div className="w-11/12 p-4 bg-base-100 card">
            <h3 className="mb-2 text-xl font-bold">
              Enter the amount you want to charge
            </h3>
            <input
              type="text"
              placeholder="Amount"
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
            {amountError && <p className="text-error">{amountError}</p>}
            <div className="flex justify-end">
              <button className="mr-2 btn btn-primary" onClick={handlePayment}>
                Pay
              </button>
              <button className="btn btn-secondary" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WalletComponent
