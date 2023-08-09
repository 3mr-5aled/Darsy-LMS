"use client"
import Loading from "@/app/loading"
import useUser from "@/lib/FetchUser"

const UserComponent = () => {
  const [user, isLoading] = useUser()

  const getUserInitials = (userName: string) => {
    const nameArray = userName.split(" ")
    const firstNameInitial = nameArray[0].charAt(0).toUpperCase()
    const lastNameInitial =
      nameArray.length > 1 ? nameArray[1].charAt(0).toUpperCase() : ""
    return firstNameInitial + lastNameInitial
  }

  return (
    <>
      {isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <div className="dropdown dropdown-top dropdown-end">
          <label tabIndex={0} className="">
            <div className="avatar placeholder">
              <div className="w-12 transition-all border-2 border-gray-800 rounded-full cursor-pointer bg-neutral-focus text-neutral-content hover:border-2 hover:border-secondary">
                {" "}
                {/* Apply transition to the border color */}
                {user ? (
                  <span className="font-bold">
                    {getUserInitials(user.name)}
                  </span>
                ) : (
                  <span className="font-bold">X</span>
                )}
              </div>
            </div>
          </label>
          <div
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-max"
          >
            <div>
              <span className="font-bold">Name:</span> {user?.name}
            </div>
            <div>
              <span className="font-bold">Email:</span> {user?.email}
            </div>
            <div>
              <span className="font-bold">Role:</span> {user?.role}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserComponent
