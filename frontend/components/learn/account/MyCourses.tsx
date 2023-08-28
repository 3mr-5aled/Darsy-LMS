"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/axios.config";
import Link from "next/link";
import Image from "next/image";
import NotFoundComponent from "@/components/Features/NotFoundComponent";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/userContext";

const MyCourses = () => {
  const { state } = useUserContext();
  const { user } = state;
  const router = useRouter();

  if (!user) {
    return <NotFoundComponent message="you are not enrolled in courses" />;
  }

  const handleContinueCourse = async (courseId: string) => {
    try {
      const response = await axiosInstance.get(
        `/lesson/${courseId}/continue-lesson`,
      );
      router.push(`/app/lesson/${response.data.nextLesson}`);
    } catch (error) {}
  };

  return (
    <div className="flexCenter card h-full w-full flex-col bg-base-300">
      <h1 className="py-5 text-2xl font-bold">My Courses</h1>
      <div className="min-w-1/2 card bg-base-300 p-5 pt-0">
        {user.enrolledCourse.length > 0 ? (
          <ul className="grid list-none grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {user.enrolledCourse.map((course) => (
              <li key={course.courseId}>
                <button
                  className=" min-h-80 card my-5 bg-base-100 p-5 hover:bg-base-200"
                  onClick={() => handleContinueCourse(course.courseId)}
                >
                  <Image
                    className="rounded-md"
                    src={course.courseImg.src || "/images/no-course-image.png"}
                    alt={course.name}
                    width={250}
                    height={250}
                  />
                  <p className="mt-3">
                    <strong>{course.name}</strong> - <strong>Progress</strong> :{" "}
                    {course.lessonsDone.length}/{course.lessonTotal}
                  </p>
                  <div className="my-3 h-2.5 w-full rounded-full bg-base-content">
                    <div
                      className="h-2.5 rounded-full bg-secondary"
                      style={{
                        width: `${
                          (course.lessonsDone.length / course.lessonTotal) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center">
            <NotFoundComponent message="You have not enrolled in any courses yet." />
            <Link href="/courses">
              <button className="btn btn-primary">Browse Courses</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
