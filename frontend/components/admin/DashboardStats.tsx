"use client"
import React from "react"
import { AnalyticsData } from "@/common.types"
import { BsCash, BsPeople, BsPersonCheck, BsMortarboard } from "react-icons/bs"

interface DashboardStatsProps {
  data: AnalyticsData
}

const DashboardStats = ({ data }: DashboardStatsProps) => {
  const stats = [
    { label: "Total Revenue", value: `$${data.allMoney}`, icon: <BsCash className="text-success" /> },
    { label: "Today's Revenue", value: `$${data.todayMoney}`, icon: <BsCash className="text-info" /> },
    { label: "Enrolled Students", value: data.enrolledStudents, icon: <BsMortarboard /> },
    { label: "Active Members", value: data.studentsInMembership, icon: <BsPersonCheck className="text-primary" /> },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="stat shadow bg-base-100 rounded-box">
          <div className="stat-figure text-2xl">{stat.icon}</div>
          <div className="stat-title">{stat.label}</div>
          <div className="stat-value text-2xl">{stat.value}</div>
        </div>
      ))}
    </div>
  )
}

export default DashboardStats
