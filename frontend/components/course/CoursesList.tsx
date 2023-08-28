"use client";
import { CourseType } from "@/common.types";
import useCourses from "@/lib/api/FetchCourses";
import Loading from "@/app/loading";
import NotFoundComponent from "@/components/Features/NotFoundComponent";
import DataLoading from "@/components/Features/DataLoading";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Metadata } from "next";
import { Owner } from "@/constant";

export const metadata: Metadata = {
  title: `Courses - ${Owner.WebsiteDetails.name}`,
};

const CoursesList = () => {
  const [courses, isLoading, error] = useCourses();
  const router = useRouter();

  if (error) {
    return <NotFoundComponent message={error} />;
  }

  const getLaunchDate = (date: number) => {
    const time = new Date(date);
    return time.toLocaleString().replace(",", " ");
  };

  return (
    // <DataLoading data={courses} loadingTime={10000} message="Courses Not Found">
    <div className="m-5 grid grid-cols-1 gap-5 overflow-x-hidden md:grid-cols-2 lg:grid-cols-4">
      {courses && courses.length > 0 ? (
        courses.map((item: CourseType, index: number) => (
          <div
            key={index}
            className="card mx-auto w-fit bg-base-300 p-5 shadow-xl"
          >
            <div
              onClick={() =>
                item.isShown && router.push(`/courses/view-course/${item._id}`)
              }
              id={item._id}
            >
              <div>
                <Image
                  className="rounded-lg"
                  src={item.courseImg.src || "/images/no-course-image.png"}
                  alt={item.name}
                  width={350}
                  height={350}
                />
              </div>
              <div className="my-3 flex flex-col gap-3">
                <h3 className="text-2xl font-bold">{item.name}</h3>
                <div className="mx-1 flex flex-row justify-between gap-5">
                  <span className="block">{item.price}$</span>
                  <span className="block">{item.duration}h</span>
                </div>
                {item.isShown ? (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      item.isShown
                        ? router.push(`/courses/view-course/${item._id}`)
                        : null
                    }
                  >
                    Enroll Now
                  </button>
                ) : (
                  <p>
                    release in :{" "}
                    <span className=" font-medium text-white">
                      {getLaunchDate(item.appearanceDate)}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
    // </DataLoading>
  );
};

export default CoursesList;
