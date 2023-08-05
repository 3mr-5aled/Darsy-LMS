"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/axios.config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useRouter } from "next/navigation";
import { any, string } from "prop-types";
import Loading from "@/app/loading";
import NotFoundComponent from "@/components/NotFoundComponent";

const StudentQuizPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([]);
  console.log(selectedAnswers);
  useEffect(() => {
    // Fetch quiz questions from the API based on the id
    const fetchQuizQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/exam/${id}/get-exam`);
        setQuestions(response.data.exam);
        // Initialize selectedAnswers array with null values for each question
        setSelectedAnswers(new Array(response.data.exam.length).fill(null));
        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
        setIsLoading(false);
        if (error.response.data.errCode === 6342) {
          setError("you havee submited this exam before");
          return;
        }
        toast.error("Error fetching quiz questions.");
      }
    };

    fetchQuizQuestions();
  }, [id]);
  if (isLoading) {
    return <Loading />;
  }
  const handleAnswerChange = (
    questionIndex: number,
    answerText: string,
    isCheckBoxQuiz: Boolean,
    correctAnswers: []
  ) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    let selectedAnswer: string[] = updatedSelectedAnswers[questionIndex]?.selectedAnswer || [];
    console.log(selectedAnswer,answerText)
    if (!isCheckBoxQuiz) {
      selectedAnswer = [answerText];
    } else {
      if (selectedAnswer.includes(answerText)) {
        console.log('innn')
        selectedAnswer = selectedAnswer.length > 0 ? [...selectedAnswer] : [answerText] // If it is, create a shallow copy of selectedAnswer (unnecessary step)
      } else {
        if (selectedAnswer.length === correctAnswers.length) {
          selectedAnswer.splice(0, 1);
          selectedAnswer = [...selectedAnswer, answerText]; // If it is not, create a new array with answerText appended
        } else {
          selectedAnswer = [...selectedAnswer, answerText]; // If it is not, create a new array with answerText appended
        }
      }
    }
    updatedSelectedAnswers[questionIndex] = {
      correctAnswers,
      isCheckBoxQuiz,
      selectedAnswer,
    };
    setSelectedAnswers(updatedSelectedAnswers);
    console.log(selectedAnswers[questionIndex]?.selectedAnswer?.includes(answerText))  
  };
  console.log(selectedAnswers);

  const handleSubmit = async () => {
    // Check if all questions have been answered
    if (
      selectedAnswers.some((selectedAnswer) =>
        selectedAnswer.isCheckBoxQuiz
          ? selectedAnswer.selectedAnswer < 2
          : selectedAnswer.selectedAnswer === 0
      )
    ) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    try {
      // Make the POST request to the API endpoint using axiosInstance.post()
      const response = await axiosInstance.put(`/exam/${id}/submit-exam`, {
        exam: selectedAnswers,
      });

      // Handle the response from the API
      if (response.status === 200) {
        console.log(response.data);
        // Redirect the user to the exam page with the results
        router.push(`/exam-results/${id}`);
      } else {
        toast.error("Error submitting the quiz. Please try again.");
      }
    } catch (error: any) {
      toast.error("Error submitting the quiz. Please try again.");
      console.error(error);
    }
  };
  if (error) {
    return <NotFoundComponent message={error} />
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 mt-4 underline text-4xl font-semibold text-center">
        Quiz
      </h1>
      {questions.map((q, questionIndex) => (
        <div key={questionIndex} className="mb-6">
          <p className="block mb-2 font-semibold">
            Question {questionIndex + 1}: {q.question}
          </p>
          {q.questionImage && (
            <img
              alt={`Question ${questionIndex + 1} Image`}
              src={q.questionImage}
              className="max-w-md mt-2"
            />
          )}

          <div className="divider"></div>
          <div className="mt-3 mb-4">
            <label className="font-semibold">Select Answer:</label>
            <div className="flex flex-col gap-3">
              {q.answers.map((answer: any, answerIndex: number) => (
                <div
                  key={answerIndex}
                  className={`flex flex-row gap-3 items-center bg-base-200 ${
                    selectedAnswers[questionIndex]?.selectedAnswer?.includes(answer.text)
                      ? "bg-primary text-white"
                      : "bg-base-200"
                  } card p-5`}
                >
                  {q.isCheckBoxQuiz ? 
                  (  
                    <input
                      title="Correct answer"
                      type="checkbox"
                      className="checkbox"
                      checked={selectedAnswers[questionIndex]?.selectedAnswer?.includes(answer.text)}
                      onChange={() =>
                        handleAnswerChange(
                          questionIndex,
                          answer.text,
                          q.isCheckBoxQuiz,
                          q.correctAnswer
                        )
                      }
                   />
                  ) : (
                    <input
                      title="Correct answer"
                      type="radio"
                      className="radio"
                      name={`correctAnswer-${questionIndex}`}
                      value={answerIndex}
                      checked={selectedAnswers[questionIndex]?.selectedAnswer?.includes(answer.text)}
                      onChange={() =>
                        handleAnswerChange(
                          questionIndex,
                          answer.text,
                          q.isCheckBoxQuiz,
                          q.correctAnswer
                        )
                      }
                    />
                  )}
                  <span>{answer.text}</span>
                  {answer.image && (
                    <img
                      src={answer.image}
                      alt={`Question ${questionIndex + 1} Answer ${
                        answerIndex + 1
                      } Image`}
                      className="max-w-xs rounded-md mt-2"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit Quiz
      </button>
    </div>
  );
};

export default StudentQuizPage;
