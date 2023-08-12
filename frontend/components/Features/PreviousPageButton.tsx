import { useRouter } from "next/navigation"
import React from "react"
import { BsArrowLeft } from "react-icons/bs"

const PreviousPageButton = () => {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }
  return (
    <button
      title="back"
      type="button"
      className="btn btn-secondary"
      onClick={goBack}
    >
      <BsArrowLeft size={20} />
    </button>
  )
}

export default PreviousPageButton
