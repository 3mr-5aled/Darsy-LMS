"use client"

import useUser from "@/lib/FetchUser"

const Profile = () => {
  const [user, isLoading] = useUser()

    if (!user) {
      return <div>User not found</div>
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen prose">
      <h1>My Profile</h1>
      <ul>
        <li>Name: {user.name}</li>
        <li>Email: {user.email}</li>
        <li>Phone: {user.phone}</li>
        <li>Parent Phone: {user.parentsPhone}</li>
        <li>City: {user.city}</li>
        <li>Grade: {user.grade}</li>
        <li>Gender: {user.gender}</li>
      </ul>
    </div>
  )
}

export default Profile
