"use client"
import { useState, useEffect } from "react"
import axiosInstance from "@/axios.config"
import { AnalyticsData } from "@/common.types"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import Loading from "@/app/loading"
import { data } from "autoprefixer"
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("year")
  const [revenueDataCurrentMonth, setRevenueDataCurrentMonth] = useState<
    number[]
  >([])
  const [revenueDataYear, setRevenueDataYear] = useState<number[]>([])
  const [revenueDataLastSevenDays, setRevenueDataLastSevenDays] = useState<
    number[]
  >([])

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axiosInstance.get("/analysis")
        setAnalyticsData(response.data)
        // Fetch revenue data for the year 2023
        const currentYear = new Date().getFullYear() // Months are 0-indexed, so we add 1

        const yearResponse = await axiosInstance.get(
          `/total-money-per-period?year=${currentYear}`
        )
        setRevenueDataYear(yearResponse.data)

        // Fetch revenue data for the current month
        const currentMonth = new Date().getMonth() + 1 // Months are 0-indexed, so we add 1
        const monthResponse = await axiosInstance.get(
          `/total-money-per-period?year=${currentYear}&month=${currentMonth}`
        )
        setRevenueDataCurrentMonth(monthResponse.data)

        // Fetch revenue data for the last seven days
        const currentDay = new Date().getDate() // Months are 0-indexed, so we add 1

        const dayResponse = await axiosInstance.get(
          `/total-money-per-period?year=${currentYear}&month=${currentMonth}&day=${currentDay}`
        )
        setRevenueDataLastSevenDays(dayResponse.data)

        setLoading(false)
      } catch (error) {
        console.error("Error while fetching revenue data:", error)
        setLoading(false)
      }
    }

    fetchRevenueData()
  }, [])

  const currentYear = new Date().getFullYear()

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${currentYear} Revenue`,
      },
    },
  }

  const revenueChartDataYear = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: `${currentYear} Revenue`,
        data: revenueDataYear,
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  }
  const revenueChartDataCurrentMonth = {
    labels: revenueDataCurrentMonth.map((data, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: `Revenue Current Month`,
        data: revenueDataCurrentMonth,
        borderColor: "rgba(192, 192, 75, 1)",
      },
    ],
  }

  const revenueChartDataLastSevenDays = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: `Revenue Last Seven Days`,
        data: revenueDataLastSevenDays,
        borderColor: "rgba(192, 75, 75, 1)",
      },
    ],
  }
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range)
  }
  return (
    <div className="flex-col w-full text-2xl flexCenter min-h-24">
      <h1 className="mt-8 mb-2 text-4xl font-bold">Dashboard</h1>
      {loading ? (
        <Loading />
      ) : (
        analyticsData && (
          <div>
            <div className="grid grid-cols-2 gap-4 p-5 mt-8">
              <div className="p-4 rounded-lg bg-base-100">
                <h2 className="text-xl font-semibold">Total Revenue</h2>
                <p className="text-3xl font-bold text-success">
                  ${analyticsData.allMoney}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-base-100">
                <h2 className="text-xl font-semibold">Today's Revenue</h2>
                <p className="text-3xl font-bold text-success">
                  ${analyticsData.todayMoney}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-base-100">
                <h2 className="text-xl font-semibold">
                  Today's Signed-In Students
                </h2>
                <p className="text-3xl font-bold text-success">
                  {analyticsData.todaySignedInStudents}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-base-100">
                <h2 className="text-xl font-semibold">Enrolled Students</h2>
                <p className="text-3xl font-bold text-success">
                  {analyticsData.enrolledStudents}
                </p>
              </div>
            </div>
            <div className="mt-8 mb-12">
              <h2 className="mb-4 text-xl font-semibold">Revenue Chart</h2>
              <div className="flex mb-4">
                {/* Switch between the year, current month, and last seven days chart */}
                <button
                  className={`mr-2 ${
                    timeRange === "year"
                      ? "bg-primary rounded-xl p-3 text-sm font-bold"
                      : "text-sm font-bold bg-base-100 hover:bg-primary-focus transition-all rounded-xl p-3"
                  }`}
                  onClick={() => handleTimeRangeChange("year")}
                >
                  Current Year
                </button>
                <button
                  className={`mr-2 ${
                    timeRange === "currentMonth"
                      ? "bg-primary rounded-xl p-3 text-sm font-bold"
                      : "text-sm font-bold bg-base-100 hover:bg-primary-focus transition-all rounded-xl p-3"
                  }`}
                  onClick={() => handleTimeRangeChange("currentMonth")}
                >
                  Current Month
                </button>
                <button
                  className={`${
                    timeRange === "lastSevenDays"
                      ? "bg-primary rounded-xl p-3 text-sm font-bold"
                      : " text-sm font-bold bg-base-100 hover:bg-primary-focus transition-all rounded-xl p-3"
                  }`}
                  onClick={() => handleTimeRangeChange("lastSevenDays")}
                >
                  Last Seven Days
                </button>
              </div>
              {/* Render the chart based on the selected time range */}
              {timeRange === "year" ? (
                <Line options={options} data={revenueChartDataYear} />
              ) : timeRange === "currentMonth" ? (
                <Line options={options} data={revenueChartDataCurrentMonth} />
              ) : (
                <Line options={options} data={revenueChartDataLastSevenDays} />
              )}
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default Dashboard
