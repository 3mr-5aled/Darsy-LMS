"use client";
import axiosInstance from "@/axios.config";
import { ApiResponseType, LessonType, SectionType } from "@/common.types";
import { useUserContext } from "@/contexts/userContext";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface RadialProgressStyle {
  "--value": number;
  "--size": string;
}

const LearnPageAppMenu = () => {
  const { id } = useParams();

  const [data, setData] = useState<any | null>(null);
  const [lesson, setLesson] = useState<LessonType | null>(null);
  const [sections, setSections] = useState<SectionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { state, setUser, clearUser } = useUserContext();
  const { user } = state;
  const [progress, setProgress] = useState(0);
  const [lessonsDone, setLessonsDone] = useState(0);
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axiosInstance.get<ApiResponseType>(
          `/lesson/get-lesson/${id}`
        );
        setData(response.data);
        setLesson(response.data.lesson);
        setSections(response.data.sections);
        setIsLoading(false);
      } catch (error: any) {
        console.error(error);
        toast.error(error.response.message);
        setIsLoading(false);
        return <p>{error.response.message}</p>;
        // Handle error, e.g., show an error message or redirect to an error page
      }
    };

    fetchLesson();
  }, [id]);

  useEffect(() => {
    if (data && user && user.enrolledCourse.length > 0) {
      const courseWithProgress = user.enrolledCourse.find(
        (enrolledCourse) => enrolledCourse.courseId === data.course._id
      );
      if (courseWithProgress) {
        const lessonsDone = courseWithProgress.lessonsDone.length;
        const progress: number = (lessonsDone / data.totalLessons) * 100;
        console.log('done')
        setProgress(progress);
        setLessonsDone(lessonsDone);
        return;
      }
    }
  },[data, user])

  const radialProgressStyle: RadialProgressStyle = {
    "--value": progress,
    "--size": "4rem",
  };

  return (
    <>
      {data && (
        <div>
          <div className="flex flex-row items-center justify-between w-full h-20 p-5 bg-base-300">
            <div className="flex flex-row gap-5">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
              >
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
              </label>
              <Link href={`/courses/view-course/${data.course._id}`}>
                <h1 className="text-2xl font-extrabold">{data.courseTitle}</h1>
                <span>
                  {lessonsDone}/{data.totalLessons} Lesson Done
                </span>
              </Link>
            </div>
            <div className="m-3">
              <div
                className="radial-progress"
                // @ts-ignore
                style={radialProgressStyle as CSSProperties}
              >
                {progress.toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LearnPageAppMenu;
