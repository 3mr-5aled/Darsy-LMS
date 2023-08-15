import React from "react"
import { BsCircleFill, BsStars, BsDiamondFill } from "react-icons/bs"

interface MembershipIconProps {
  membership: {
    name?: string
  }
}

const MembershipIcon: React.FC<MembershipIconProps> = ({ membership }) => {
  const membershipName = membership?.name?.toLowerCase()

  if (membershipName && membershipName.includes("gold")) {
    return (
      <div className="flex flex-row">
        <p className="font-bold text-amber-400">Gold</p>
        <BsCircleFill className="text-amber-400" />
      </div>
    )
  } else if (membershipName && membershipName.includes("platinum")) {
    return (
      <div className="flex flex-row">
        <p className="font-bold text-cyan-500">Platinum</p>
        <BsStars className="text-cyan-500" />
      </div>
    )
  } else if (membershipName && membershipName.includes("diamond")) {
    return (
      <div className="flex flex-row">
        <p className="font-bold text-blue-500">Diamond</p>
        <BsDiamondFill className="text-blue-500" />
      </div>
    )
  }

  return <p className="font-bold text-gray-500">No current subscription</p>
}

export default MembershipIcon
