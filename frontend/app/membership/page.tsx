import MembershipList from "@/components/membership/MembershipList"
import { Owner } from "@/constant"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Memberships - ${Owner.WebsiteDetails.name}`,
}

const MembershipsPage = () => {
  return <MembershipList />
}

export default MembershipsPage
