"use client";
import { useEffect } from "react";
import useCourses from "@/lib/api/FetchCourses";
import Loading from "@/app/loading";
import { CourseType } from "@/common.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NotFoundComponent from "@/components/Features/NotFoundComponent";

const CoursesAdminView = () => {
  const [courses, isLoading, error] = useCourses();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      console.log("Error fetching courses:", error);
    }
  }, [error]);

  if (isLoading) {
    return <Loading />;
  }

  if (!Array.isArray(courses) || courses.length === 0) {
    return <NotFoundComponent message="No Courses available" />;
  }

  return (
    <div className="m-5 grid grid-flow-col gap-5 overflow-x-hidden md:grid-cols-3">
      {courses.map((item: CourseType, index: number) => (
        <div key={index} className="card w-fit bg-base-100 p-5">
          <Link href={`/admin/courses/manage-course/${item._id}`}>
            <div>
              <img
                className="rounded-lg"
                src={item.courseImg?.src || "/images/no-course-image.png"}
                alt={item.name}
                width={350}
                height={350}
              />
            </div>
            <div className="my-3 flex flex-col gap-3">
              <h3 className="text-xl font-bold">{item.name}</h3>
              <div className="mx-1 flex flex-row justify-between gap-5">
                <span className="block">{item.price}$</span>
                <span className="block">{item.duration}h</span>
              </div>
              <button
                className="btn btn-primary"
                onClick={() =>
                  router.push(`/admin/courses/manage-course/${item._id}`)
                }
              >
                Manage course
              </button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CoursesAdminView;
