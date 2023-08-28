import { useState, useEffect } from "react";
import axiosInstance from "@/axios.config";
import { toast } from "react-toastify";
import { CourseType } from "@/common.types";
import { useUserContext } from "@/contexts/userContext";

const useCourses = (): [CourseType[] | null, boolean, string | null] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<CourseType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { state } = useUserContext();
  const { user } = state;
  const [filter, setFilter] = useState<string>("all");

  const fetchCourses = async (filter: string) => {
    setIsLoading(true);
    setError(null); // Reset the error state before making a new request
    try {
      const response = await axiosInstance.get(
        `/course/get-all-courses/${filter}`,
      );
      setCourses(response.data);
    } catch (error: any) {
      console.log("error:", error);
      setError(error.message); // Provide a general error message
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setFilter(user.grade);
    } else {
      setFilter("all");
    }
  }, [user]);

  // Fetch courses whenever the filter changes
  useEffect(() => {
    fetchCourses(filter);
  }, [filter]);

  return [courses, isLoading, error];
};

export default useCourses;
