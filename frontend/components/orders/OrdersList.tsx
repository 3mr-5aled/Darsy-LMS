import React from "react"
import { useRouter } from "next/navigation"
import { userOrders } from "@/common.types" // Make sure to import the correct type

const OrdersList = ({
  orders,
  admin,
}: {
  orders: userOrders[]
  admin: boolean
}) => {
  const router = useRouter()

  const getOrderTime = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString()
  }

  const viewCoursePage = (courseId: string | null) => {
    if (courseId) {
      router.push("/courses/view-course/" + courseId)
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-pin-rows table-pin-cols">
        <thead className=" sticky top-5 text-2xl font-semibold">
          <tr>
            <th></th>
            <th>Type</th>
            <th>Amount</th>
            <th>Admin</th>
            <th>Course</th>
            <th>Trans Ref</th>
            <th>Provider</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr 
              key={order._id}
              onClick={() => {
                admin
                  ? router.push("/admin/orders/single-order/" + order._id)
                  : router.push("/account/single-order/" + order._id)
              }}
              className={`${
                index % 2 === 0 ? "bg-secondary bg-opacity-20" : "bg-base-100"
              } cursor-pointer`}
            >
              <th>{index + 1}</th>
              <td>{order.type || "---"}</td>
              <td>{order.amount}</td>
              <td
                data-tip={order.adminId?.name}
                className="cursor-default z-0 tooltip"
              >
                {order.adminId?.name.split(" ")[0] || "---"}
              </td>
              <td
                onClick={() => viewCoursePage(order.courseId?._id as string)}
                className={`${
                  order.courseId
                    ? "cursor-pointer hover:text-accent duration-200"
                    : ""
                }`}
              >
                {order.courseId?.name || "---"}
              </td>
              <td className="truncate">{order.tran_ref || "---"}</td>
              <td>
                {order.tran_ref ? "paytabs" : order.adminId ? "admin" : "user"}
              </td>
              <td>{order.status}</td>
              <td>{getOrderTime(order.createdAt as string)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersList
