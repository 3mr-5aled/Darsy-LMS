"use client"
import axiosInstance from "@/axios.config"
import { Owner } from "@/constant"
import router from "next/router"
import { useRef, useState } from "react"
import { BsPlusCircleFill } from "react-icons/bs"
import { toast } from "react-toastify"
import ConfirmModal from "../Features/ConfirmModal"

interface WalletComponentProps {
  credit: number // Define the credit prop type
}

const WalletComponent = ({ credit }: WalletComponentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [amountError, setAmountError] = useState("")
  // const modal = useRef<HTMLDialogElement | null>(null)

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
    // if (modal.current) {
    //   modal.current.showModal()
    // }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    // if (modal.current) {
    //   modal.current.close()
    // }
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
      {isModalOpen &&
        (!Owner.premium.paytabs ? (
          <ConfirmModal title="Add Credit" handleClose={handleCloseModal}>
            <p className="py-4">
              Please Contact the support team to add credit
            </p>
          </ConfirmModal>
        ) : (
          <ConfirmModal
            title="Add Credit"
            ConfirmText="Pay Now"
            handleClick={handlePayment}
            handleClose={handleCloseModal}
          >
            <p className="py-4">Enter the amount you want to charge</p>
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
          </ConfirmModal>
        ))}
    </>
  )
}

export default WalletComponent
