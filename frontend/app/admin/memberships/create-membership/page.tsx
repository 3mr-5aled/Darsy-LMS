"use client"

import MembershipForm from "@/components/Forms/MembershipForm"
import PremiumOnlyRoute from "@/components/Routes/PremiumOnlyRoute"

export default function CreateMembership() {
  return (
    <PremiumOnlyRoute feature="membership">
      <div className="flexCenter">
        <MembershipForm title="Create Membership" type="create" />
      </div>
    </PremiumOnlyRoute>
  )
}
