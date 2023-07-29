"use client"

import NotFoundComponent from "@/components/NotFoundComponent"
import useUser from "@/lib/FetchUser"

const Profile = () => {
  const [user, isLoading] = useUser()

  if (!user) {
    return <NotFoundComponent message="Error getting user" />
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen prose">
      <h1>My Profile</h1>
      <ul>
        <li>Name: {user?.name}</li>
        <li>Email: {user?.email}</li>
        <li>Phone: {user?.phone}</li>
        <li>Credit: {user?.credit}</li>
        {/* // TODO */}
        {/* <li>Membership: {user?.membership.name}</li> */}
        {/* calculate teh expireed time left */}
        {/* <li>Membership expiretime: {user?.membership.expiretime} from now</li> */}
        <li>Parent Phone: {user?.parentsPhone}</li>
        <li>City: {user?.city}</li>
        <li>Grade: {user?.grade}</li>
        <li>Gender: {user?.gender}</li>
        <li>Role: {user?.role}</li>
      </ul>
    </div>
  )
}

export default Profile
