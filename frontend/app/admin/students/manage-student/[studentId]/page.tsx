"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/axios.config";
import { UserType } from "@/common.types";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/app/loading";
import CreditModal from "@/components/AddCredit"; // Import the CreditModal component
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Image from "next/image";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const StudentPage = () => {
  interface userDegress {
    degree: number;
    lessonTitle: string;
    examDate: Date;
    lessonId: string;
  }
  interface userCourses {
    name: string
    courseId: string
    courseImg: string
    progress:number
  }
  interface userOrders {
    userId:{
      _id:string,
      name:string
    }
    createdAt:string
    _id:string
    adminId?:{      
      _id:string,
      name:string}
    amount:string
    courseId?:{      
      _id:string,
      name:string}
    tran_ref?:string
    status:string
    type:string
  }
  const router = useRouter();
  const { studentId } = useParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [degress, setDegrees] = useState<userDegress[] | null>(null);
  const [orders, setOrders] = useState<userOrders[] | null>(null);
  const [userEnrolledCourses, setUserEnrolledCourses] = useState<userCourses [] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState<boolean>(false);

  const goBack = () => {
    router.back();
  };
  useEffect(() => {
    // Fetch user from the API
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/user/get-user/${studentId}`);
        setUser(response.data.userDetails);
        setDegrees(response.data.userDegrees);
        setUserEnrolledCourses(response.data.userCourses);
        setOrders(response.data.userOrders);
        setIsLoading(false);
      } catch (error: any) {
        setError("An error occurred while fetching user.");
        toast.error("An error occurred while fetching user")
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [studentId]);
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      // Make an API call to delete the user based on the ID
      await axiosInstance.delete(`/user/delete-user/${studentId}`);
      toast.success("User deleted successfully");
      router.push("/admin/students");
    } catch (error) {
      setError("An error occurred while deleting the user.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCredit = async (amount: number ) => {
    try {
      setIsLoading(true);
      // Make an API call to add credit to the user based on the ID
      await axiosInstance.post(`/user/edit-credit/${studentId}`, { amount });
      const response = await axiosInstance.get(`/user/get-user/${studentId}`);
      setIsCreditModalOpen(false)
      setUser(response.data.userDetails);
    } catch (error) {
      toast.error("An error occurred while adding credit.");
    } finally {
      setIsLoading(false);
    }
};

  if (isLoading) {
    return <Loading />;
  }

  
  const viewCoursePage =(courseId:string | null)=>{
    if(courseId){
      router.push('/courses/view-course/'+courseId)
    }
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Student Degrees`,
        font: {
          size: 36, // Increase the font size for the chart title
        },
      },
    },
  };
  const revenueChartDatauserDegree = {
    labels: degress?.map((degree) => degree.lessonTitle),
    datasets: [
      {
        label: `exam degree`,
        data: degress?.map((degree) => degree.degree),
        borderColor: "rgba(192, 192, 75, 1)",
      },
    ],
  };
  const getOrderTime = (createdAt : string) =>{
    return new Date(createdAt).toLocaleDateString()
  }
  return (
    <div className="p-5 m-5">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Student Details</h1>
      </div>
      <div className="grid items-center justify-center w-full grid-cols-2 gap-4">
        <div className="font-bold">Name:</div>
        <div>{user?.name}</div>

        <div className="font-bold">Email:</div>
        <div>{user?.email}</div>

        <div className="font-bold">Phone:</div>
        <div>{user?.phone}</div>

        <div className="font-bold">Credit:</div>
        <div>{user?.credit.toFixed(0)}</div>

        {/* // TODO */}
        {/* <li>Membership: {user?.membership.name}</li> */}
        {/* calculate teh expiredtime left */}
        {/* <li>Membership expiretdime: {user?.membership.expiredtime} from now</li> */}

        <div className="font-bold">Parents' Phone:</div>
        <div>{user?.parentsPhone}</div>

        <div className="font-bold">Date of Birth:</div>
        <div>{user?.dateOfBirth}</div>

        <div className="font-bold">Role:</div>
        <div>{user?.role}</div>

        <div className="font-bold">Gender:</div>
        <div>{user?.gender}</div>

        <div className="font-bold">Grade:</div>
        <div>{user?.grade}</div>
        <div className="font-bold">City:</div>
        <div>{user?.city}</div>
      </div>
      <div className="flex justify-center mt-5 space-x-4">
        <button type="button" className="btn btn-secondary" onClick={goBack}>
          Back
        </button>
        <Link href={`/admin/students/edit-student/${studentId}`} passHref>
          <button className="btn btn-primary">Edit</button>
        </Link>
        <button className="btn btn-error" onClick={handleDelete}>
          Delete
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setIsCreditModalOpen(true)}
        >
          Edit Credit
        </button>
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Enrolled Courses</h1>
      </div>
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 my-5 xl:grid-cols-4">
        {
          userEnrolledCourses && (userEnrolledCourses.map(course => (
            <div onClick={() => viewCoursePage(course.courseId as string)} key={course.courseId} className=" bg-neutral overflow-hidden cursor-pointer hover:bg-base-100 hover:shadow-base-100 hover:shadow-lg transition-all duration-300  rounded-xl pb-3">
              <div className="px-0">
            <Image
            className="w-full"
              src={course.courseImg}
              alt={course.name}
              height={50}
              width={100}
            />
            <div className=" card-title my-2 px-3">{course.name}</div>

            <div className="mt-1 text-xl px-3">progress:<span className={course.progress > 50 ? "text-success" : "text-error"}>{course.progress}%</span></div>
                </div>
            </div>
          )))
        }
      </div>
      <div className="mt-10">
        <Line options={options} data={revenueChartDatauserDegree} />
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Student Orders</h1>
      </div>
      {orders && orders.length > 0 &&(
      <div className="mt-10">
      <div>
      <div className=" py-5 my-3 rounded-xl justify-items-center grid grid-cols-8 sticky top-5 z-10 bg-slate-900 ">
        <div className="  font-extrabold ">type</div>
        <div className="  font-extrabold ">amount</div>
        <div className="  font-extrabold ">admin</div>
        <div className="  font-extrabold ">course</div>
        <div className="  font-extrabold ">trans ref</div>
        <div className="  font-extrabold ">provider</div>
        <div className="  font-extrabold ">status</div>
        <div className="  font-extrabold ">Date</div>
      </div>
        {orders.map((order,index) => (
          <div key={order._id} className={` rounded-lg gap-x-2 my-5 py-3 grid grid-cols-8 ${index % 2 === 0 ? 'bg-slate-800' : ' bg-base-100' }`}>
          <div className=" justify-self-center">{order.type ? order.type : " "}</div>
          <div className=" justify-self-center">{order.amount}</div>
          <div data-tip={order.adminId?.name} className=" cursor-default z-0 tooltip justify-self-center">{order.adminId?.name.split(' ')[0]}</div> 
          <div onClick={() =>viewCoursePage(order.courseId?._id as string)}  className={` justify-self-center ${order.courseId ? " cursor-pointer hover:text-primary-focus duration-200 " :" "}`}>{order.courseId?.name}</div>
          <div className=" truncate">{order.tran_ref ? order.tran_ref : " "}</div> 
          <div className=" justify-self-center">{order.tran_ref ? "paytabs" : order.adminId ? "admin" : "user"}</div>
          <div className=" justify-self-center">{order.status}</div>
          <div className=" justify-self-center">{getOrderTime(order.createdAt as string)}</div>
          </div>
        ))}
      </div>

      </div>)}
      {/* Render the credit modal */}
      <CreditModal
        isOpen={isCreditModalOpen}
        onClose={() => setIsCreditModalOpen(false)}
        onAddCredit={handleAddCredit}
        studentId={studentId as string}
      />
    </div>
  );
};

export default StudentPage;
