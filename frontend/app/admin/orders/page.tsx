"use client"
import OrdersList from "@/components/orders/OrdersList"
import { useEffect, useState } from "react"
import axiosInstance from "@/axios.config" // Import your axios instance
import { userOrders } from "@/common.types"

const Page = () => {
  const [orders, setOrders] = useState<userOrders[]>([])

  useEffect(() => {
    // Fetch orders from the API endpoint
    axiosInstance
      .get("/user/get-all-orders")
      .then((response) => {
        // Update the orders state with the fetched data
        setOrders(response.data.orders)
      })
      .catch((error) => {
        console.error("Error fetching orders:", error)
      })
  }, [])

  return (
    <div className="p-5">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Student Orders</h1>
      </div>
      <div className="w-80 md:w-full">
        {orders ? (
          <OrdersList orders={orders} admin={true} />
        ) : (
          <p>No Orders for current user</p>
        )}
      </div>
    </div>
  )
}

export default Page
