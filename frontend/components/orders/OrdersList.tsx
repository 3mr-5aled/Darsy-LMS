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
        <thead>
          <tr>
            <th></th>
            <th className="text-center">Type</th>
            <th className="text-center">Amount</th>
            <th className="text-center">Admin</th>
            <th className="text-center">Course</th>
            <th className="text-center">Trans Ref</th>
            <th className="text-center">Provider</th>
            <th className="text-center">Status</th>
            <th className="text-center">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length <= 0 ? (
            <tr>
              <td colSpan={9} className="text-center p-5 font-bold bg-base-100">
                No Orders done
              </td>
            </tr>
          ) : (
            orders.map((order, index) => (
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
                <th className="text-center">{index + 1}</th>
                <td className="text-center">{order.type || "---"}</td>
                <td className="text-center">{order.amount}</td>
                <td
                  data-tip={order.adminId?.name}
                  className="cursor-default z-0 tooltip text-center w-full"
                >
                  {order.adminId?.name.split(" ")[0] || "---"}
                </td>
                <td
                  onClick={() => viewCoursePage(order.courseId?._id as string)}
                  className={`${
                    order.courseId
                      ? "cursor-pointer hover:text-accent duration-200"
                      : ""
                  } text-center`}
                >
                  {order.courseId?.name || "---"}
                </td>
                <td className="truncate text-center">
                  {order.tran_ref || "---"}
                </td>
                <td className="text-center">
                  {order.tran_ref
                    ? "paytabs"
                    : order.adminId
                    ? "admin"
                    : "user"}
                </td>
                <td className="text-center">{order.status}</td>
                <td className="text-center">
                  {getOrderTime(order.createdAt as string)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersList
