"use client"
import React, { useEffect, useState } from "react"
import axiosInstance from "@/axios.config"
import { AnalyticsData } from "@/common.types"
import DashboardStats from "@/components/admin/DashboardStats"
import DataLoading from "@/components/Features/DataLoading"
import { toast } from "react-toastify"

const AdminDashboard = () => {
  const [data, setData] = useState<AnalyticsData | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axiosInstance.get("/admin/analytics")
        setData(res.data)
      } catch (err: any) {
        toast.error("Failed to load analytics: " + err.message)
      }
    }
    fetchAnalytics()
  }, [])

  return (
    <DataLoading 
      data={data} 
      loadingTime={5000} 
      message="No analytics data available"
    >
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        
        {data && <DashboardStats data={data} />}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-base-100 p-6 rounded-box shadow">
              <h2 className="text-xl font-semibold mb-4">Student Distribution</h2>
              <p className="text-gray-500">Charts coming soon...</p>
          </div>
          <div className="bg-base-100 p-6 rounded-box shadow">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <p className="text-gray-500">Activity logs coming soon...</p>
          </div>
        </div>
      </div>
    </DataLoading>
  )
}

export default AdminDashboard
