"use client";

import Loading from "@/app/loading";
import axiosInstance from "@/axios.config";
import { CourseType } from "@/common.types";
import { PremiumOnlyComponent } from "@/components/Routes/PremiumOnlyRoute";
import CourseSections from "@/components/course/CourseSections";
import { useUserContext } from "@/contexts/userContext";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CourseView = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [course, setCourse] = useState<CourseType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { state } = useUserContext();
  const { user } = state;

  const { id } = useParams();
  const fetchCourse = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/course/get-course/${id}`);
      setCourse(response.data);
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
      toast.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  if (!course) {
    return <Loading />;
  }

  const calculateLessonsCompleted = () => {
    if (!user) {
      return 0;
    }

    const enrolledCourse = user.enrolledCourse.find(
      (enrolled) => enrolled.courseId === course._id,
    );

    return enrolledCourse ? enrolledCourse.lessonsDone.length : 0;
  };

  const calculateDiscountedPrice = () => {
    // Add a null check for course.discount
    if (course.discount !== undefined && course.discount > 0) {
      // const originalPrice = parseFloat(course.price)
      const discountPercentage = course.discount / 100;
      const discountedPrice = course.price - course.price * discountPercentage;
      return discountedPrice.toFixed(2);
    }
    return course.price;
  };

  // Render the price with discount if applicable
  const renderPrice = () => {
    if (course.discount > 0) {
      const discountedPrice = calculateDiscountedPrice();
      return (
        <div>
          <p>
            Price: <del className="text-gray-500">{course.price}$</del>
            <span className="px-2 text-success">{discountedPrice}$</span>
          </p>
          <p className="text-warning">Discount : {course.discount}%</p>
        </div>
      );
    }
    return <p>Price: {course.price}$</p>;
  };

  const handleEnrollCourse = async () => {
    try {
      if (!user) {
        // User is not logged in, navigate to the login page
        router.push("/auth/login");
        return;
      }
      // Course price is 0, add the course to the user
      const response = await axiosInstance.put(
        `/user/add-course-to-user/${user?._id}`,
        {
          courseId: course._id,
          amount: 0,
        },
      );
      // const { order } = response.data
      toast.success("Course enrolled successfully");
      // Navigate to the Learn page passing the courseId as a query parameter
      router.push(`/app`);
    } catch (error) {
      console.error(error);
      // Handle errors if necessary
    }
  };
  const handlePayment = async () => {
    try {
      if (!user) {
        // User is not logged in, navigate to the login page
        router.push("/auth/login");
        return;
      }

      // You should replace the payment API endpoint below with your actual endpoint
      const paymentResponse = await axiosInstance.post("/payment/pay", {
        courseId: course._id,
        // amount: course.price,
      });
      router.push(paymentResponse.data.url);
    } catch (error) {
      console.error(error);
      // Handle errors if necessary
    }
  };
  const handleCreditPayment = async () => {
    try {
      if (!user) {
        // User is not logged in, navigate to the login page
        router.push("/auth/login");
        return;
      }

      // You should replace the payment API endpoint below with your actual endpoint
      const paymentResponse = await axiosInstance.post("payment/buy-course", {
        courseId: course._id,
      });
      router.push(paymentResponse.data.url);
    } catch (error: any) {
      if (error.response.data.errCode) {
        toast.error("Charge your credit to buy the course");
      }
      console.error(error);
      // Handle errors if necessary
    }
  };

  const isMembershipValid = () => {
    if (!user?.membership?.expireTime) {
      return true; // If there is no expireTime, consider the membership as valid
    }

    const currentTime = new Date();
    const expireTime = new Date(user.membership.expireTime);
    return currentTime.getTime() < expireTime.getTime();
  };

  const getLaunchDate = (date: number) => {
    const time = new Date(date);
    return time.toLocaleString().replace(",", " ");
  };

  return (
    <div className="card m-5 flex flex-col bg-base-300 p-5">
      <div className="my-5 flex w-full  flex-row flex-wrap justify-center gap-20 md:flex-nowrap">
        {course.courseImg ? (
          <Image
            className="rounded-lg"
            src={course.courseImg.src || "/images/no-course-image.png"}
            alt={course.name}
            width={450}
            height={150}
          />
        ) : (
          <div
            className="rounded-lg bg-gray-300"
            style={{ width: "350px", height: "350px" }}
          >
            Course Image
          </div>
        )}
        <div className="flex flex-col justify-center ">
          <div className="flex flex-row items-center justify-between">
            <div>
              <h1 className="my-5 text-2xl font-bold">{course.name}</h1>
              {user?.enrolledCourse.some(
                (enrolledCourse) => enrolledCourse.courseId === course._id,
              ) ? (
                <span>
                  <strong>
                    {calculateLessonsCompleted()}/{course.total}
                  </strong>{" "}
                  Completed
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <p>
            Description: <strong>{course.description}</strong>
          </p>
          <p>
            Grade: <strong>{course.grade}</strong>
          </p>
          <p>
            Duration: <strong>{course.duration}</strong> hours
          </p>
          {course.isShown ? (
            user?.enrolledCourse.some(
              (enrolledCourse) => enrolledCourse.courseId === course._id,
            ) ? (
              <button
                className="btn btn-primary my-5 w-fit"
                onClick={() =>
                  router.push(`/app/lesson/${course.sections?.[0]?.lessons[0]}`)
                }
              >
                Continue Learning
              </button>
            ) : (
              <>
                {course.price === 0 || isMembershipValid() ? (
                  <>
                    <p className="my-4 whitespace-nowrap">{renderPrice()}</p>
                    <button
                      className="btn btn-primary my-1 w-fit"
                      onClick={handleEnrollCourse}
                    >
                      Enroll Now
                    </button>
                  </>
                ) : (
                  <div className="flex flex-row gap-3">
                    <PremiumOnlyComponent feature="paytabs">
                      <button
                        className="btn btn-primary my-5 w-fit"
                        onClick={handlePayment}
                      >
                        Pay and Enroll Now
                      </button>
                    </PremiumOnlyComponent>
                    <button
                      className="btn btn-secondary my-5 w-fit"
                      onClick={handleCreditPayment}
                    >
                      Pay with credit
                    </button>
                  </div>
                )}
              </>
            )
          ) : (
            <p>
              release in :{" "}
              <span className=" font-medium text-white">
                {getLaunchDate(course.appearanceDate)}
              </span>
            </p>
          )}
        </div>
      </div>
      <CourseSections
        courseId={course._id}
        sections={course.sections}
        isAdmin={false}
      />
    </div>
  );
};

export default CourseView;
