import { userOrders } from "@/common.types"
import { useRouter } from "next/navigation"
import React from "react"

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
    <div className="mt-10">
      {orders && orders.length > 0 && (
        <div className="w-max mx-5 md:mx-0">
          <div className="py-5 my-3 rounded-xl grid grid-cols-8 w-full overflow-x-visible justify-items-center sticky top-5 z-10 bg-base-300">
            <div className="font-extrabold">type</div>
            <div className="font-extrabold">amount</div>
            <div className="font-extrabold">admin</div>
            <div className="font-extrabold">course</div>
            <div className="font-extrabold">trans ref</div>
            <div className="font-extrabold">provider</div>
            <div className="font-extrabold">status</div>
            <div className="font-extrabold">Date</div>
          </div>
          {orders.map((order, index) => (
            <div
              key={order._id}
              onClick={() => {
                admin
                  ? router.push("/admin/orders/single-order/" + order._id)
                  : router.push("/account/single-order/" + order._id)
              }}
              className={`rounded-lg gap-x-2 my-5 py-3 cursor-pointer w-full overflow-x-visible grid grid-cols-8 ${
                index % 2 === 0 ? "bg-secondary bg-opacity-20" : "bg-base-100"
              }`}
            >
              <div className="justify-self-center">
                {order.type ? order.type : "---"}
              </div>
              <div className="justify-self-center">{order.amount}</div>
              <div
                data-tip={order.adminId?.name}
                className="cursor-default z-0 tooltip justify-self-center"
              >
                {order.adminId?.name.split(" ")[0] || "---"}
              </div>
              <div
                onClick={() => viewCoursePage(order.courseId?._id as string)}
                className={`justify-self-center ${
                  order.courseId
                    ? "cursor-pointer hover:text-accent duration-200"
                    : ""
                }`}
              >
                {order.courseId?.name || "---"}
              </div>
              <div className="justify-self-center truncate">
                {order.tran_ref ? order.tran_ref : "---"}
              </div>
              <div className="justify-self-center">
                {order.tran_ref ? "paytabs" : order.adminId ? "admin" : "user"}
              </div>
              <div className="justify-self-center">{order.status}</div>
              <div className="justify-self-center">
                {getOrderTime(order.createdAt as string)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersList
