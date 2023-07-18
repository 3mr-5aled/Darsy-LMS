import Link from "next/link"
import React from "react"

const Students = () => {
  const users = [
    { _id: "37", name: "Rebecca Richardson", status: "good" },
    { _id: "14", name: "Sean Porter", status: "good" },
    { _id: "54", name: "Leo Gibbs", status: "good" },
    { _id: "74", name: "Adeline Keller", status: "good" },
  ]
  // get all user
  return (
    <div className=" m-5 p-5">
      <div className="prose mb-8 text-center">
        <h1>Students</h1>
      </div>
      {users.map((user, index) => {
        return (
          <Link
            key={index}
            href={`/admin/student/${user._id}`}
            className="flex flex-row items-center justify-between w-full hover:bg-base-100 rounded-md min-w-lg p-3"
          >
            <h3 className="text-lg font-bold pr-5">{user.name}</h3>
            <p className="text-success">{user.status}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default Students
