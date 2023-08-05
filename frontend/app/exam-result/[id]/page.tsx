"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/axios.config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useRouter } from "next/navigation";
import { any, string } from "prop-types";
import Loading from "@/app/loading";
import NotFoundComponent from "@/components/NotFoundComponent";
import { useUserContext } from "@/contexts/userContext";

const ExamReult = () => {
  const { id } = useParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [exam, setExam] = useState<{} | null>(null);
  const { state, setUser, clearUser } = useUserContext();
  const { user } = state;
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  useEffect(() => {
    // Fetch quiz questions from the API based on the id
    const fetchQuizQuestions = async () => {
      if (user) {
        try {
          const response = await axiosInstance.get(
            `/exam/${id}/get-exam/${user?._id}`
          );

          setIsLoading(false);
        } catch (error: any) {
          console.log(error);
          setIsLoading(false);
          if (error.response.data.errCode === 6342) {
            setError("you have already submitted this exam before");
            return;
          }
          toast.error("Error fetching quiz questions.");
        }
      }
    };

    fetchQuizQuestions();
  }, [id]);
  if (isLoading) {
    return <Loading />;
  }

  return;
};

export default ExamReult;
