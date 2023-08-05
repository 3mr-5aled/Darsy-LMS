import { Question } from "@/common.types";
import { useEffect, useState } from "react";
import axiosInstance from "@/axios.config";
import {
  BsArrowLeftCircleFill,
  BsCheckSquareFill,
  BsCircleFill,
  BsImage,
  BsXCircleFill,
} from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const CreateQuizPage = ({
  courseId,
  sectionId,
  lessonId,
  exam,
  type,
}: {
  courseId: string;
  sectionId: string;
  lessonId: string;
  exam?: Question[];
  type: "create" | "edit";
}) => {
  const router = useRouter();
  const [imageData, setImageData] = useState<string | null>(null);

  const [questions, setQuestions] = useState<Question[]>([
    {
      question: "",
      questionImage: null,
      answers: [
        { text: "", image: null },
        { text: "", image: null },
      ],
      correctAnswer: [],
      isCheckBoxQuiz: false,
    },
  ]);

  const getImageURL = (image: File | string | null) => {
    if (!image) return "no image";
    return typeof image === "string" ? image : URL.createObjectURL(image);
  };

  useEffect(() => {
    if (exam) {
      // Deep clone the exam data to avoid modifying the original data
      setQuestions(exam);
    } else {
      // If no exam data is provided, initialize the state with a default question
      setQuestions([
        {
          question: "",
          questionImage: null,
          answers: [
            { text: "", image: null },
            { text: "", image: null },
          ],
          correctAnswer: [],
          isCheckBoxQuiz: false,
        },
      ]);
    }
  }, [exam]);

  const addQuestion = () => {
    if (questions.length < 30) {
      setQuestions([
        ...questions,
        {
          question: "",
          questionImage: null,
          answers: [
            { text: "", image: null },
            { text: "", image: null },
          ],
          correctAnswer: [],
          isCheckBoxQuiz: false,
        },
      ]);
    } else {
      toast.error("You have reached the maximum limit of 30 questions.");
    }
  };

  const removeQuestion = (questionIndex: number) => {
    if (questions.length > 1) {
      const exams = [...questions];
      exams.splice(questionIndex, 1);
      setQuestions(exams);
    } else {
      toast.error("You must have at least one question in the quiz.");
    }
  };

  const addAnswer = (questionIndex: number) => {
    if (questions[questionIndex].answers.length < 4) {
      const exams = [...questions];
      exams[questionIndex].answers.push({ text: "", image: null });
      setQuestions(exams);
    }
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    if (questions[questionIndex].answers.length > 2) {
      const exams = [...questions];
      exams[questionIndex].answers.splice(answerIndex, 1);
      setQuestions(exams);
    }
  };

  const handleQuestionChange = (index: number, value: string) => {
    const exams = [...questions];
    exams[index].question = value;
    setQuestions(exams);
  };

  const handleQuestionImageChange = (
    questionIndex: number,
    file: null | File
  ) => {
    const exams = [...questions];
    if (file !== null) {
      exams[questionIndex].questionImage = file;
      setQuestions(exams);
    }
  };

  const handleAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    value: string
  ) => {
    const exams = [...questions];
    exams[questionIndex].answers[answerIndex].text = value;
    setQuestions(exams);
  };

  const handleAnswerImageChange = (
    questionIndex: number,
    answerIndex: number,
    file: File | null
  ) => {
    const exams = [...questions];
    if (file) {
      exams[questionIndex].answers[answerIndex].image = file;
      setQuestions(exams);
    }
  };
  const handleQuestionTypeChange = (
    questionIndex: number,
    isCheckbox: boolean
  ) => {
    const exams = [...questions];
    exams[questionIndex].isCheckBoxQuiz = isCheckbox;
    if (!isCheckbox) {
      exams[questionIndex].correctAnswer = []; // Reset the correct answer when switching to radio button
    }
    setQuestions(exams);
  };

  const handleCorrectAnswerChange = (
    questionIndex: number,
    answerIndex: number
  ) => {
    const exams = [...questions];
    if (questions[questionIndex].isCheckBoxQuiz) {
      const selectedAnswers = exams[questionIndex].correctAnswer;
      const selectedAnswerText =
        questions[questionIndex].answers[answerIndex].text;
      if (!selectedAnswers.includes(selectedAnswerText)) {
        selectedAnswers.push(selectedAnswerText);
      } else {
        const index = selectedAnswers.indexOf(selectedAnswerText);
        selectedAnswers.splice(index, 1);
      }
    } else {
      exams[questionIndex].correctAnswer = [
        questions[questionIndex].answers[answerIndex].text,
      ];
    }
    setQuestions(exams);
  };

  const handleSubmit = async () => {
    const isEmptyQuestion = questions.some((q) => q.question.trim() === "");
    if (isEmptyQuestion) {
      toast.error("Please fill in all questions before submitting.");
      return;
    }

    const hasEmptyAnswer = questions.some((q) =>
      q.answers.some((answer) => answer.text.trim() === "")
    );
    if (hasEmptyAnswer) {
      toast.error("Please fill in all answers before submitting.");
      return;
    }

    const hasLessThanTwoAnswers = questions.some((q) => q.answers.length < 2);
    if (hasLessThanTwoAnswers) {
      toast.error("Each question must have at least two answers.");
      return;
    }

    const hasNoCorrectAnswer = questions.some(
      (q) => q.correctAnswer.length === 0
    );
    if (hasNoCorrectAnswer) {
      toast.error(
        "Please select at least one correct answer for each question."
      );
      return;
    }
    questions.forEach((q) => {
      const answerTexts = q.answers.map((answer) => answer.text);
      const duplicates = answerTexts.some(
        (text, index) => answerTexts.indexOf(text) !== index
      );
      if (duplicates) {
        toast.error("the answers in each question must be different");
        return;
      }
    });
    try {
      // Convert images to base64 and upload
      const exams = await Promise.all(
        questions.map(async (q) => ({
          ...q,
          questionImage: q.questionImage
            ? await uploadImageAndGetURL(q.questionImage)
            : null,
          answers: await Promise.all(
            q.answers.map(async (answer) => ({
              ...answer,
              image: answer.image
                ? await uploadImageAndGetURL(answer.image)
                : null,
            }))
          ),
        }))
      );

      // Validate that all questions have at least one correct answer

      // Make the PUT request to the API endpoint using axiosInstance.put()
      const response = await axiosInstance.put(
        `/exam/${lessonId}/add-exam`,
        exams
      );

      // Handle the response from the API
      if (response.status === 200) {
        console.log(response.data);
        // Exam successfully created
        toast.success("Quiz successfully created!");
        router.push(`/admin/courses/manage-course/${courseId}`);

        // You can also redirect the user to a different page after successful submission if needed.
      } else {
        toast.error("Error submitting the quiz. Please try again.");
      }
    } catch (error: any) {
      toast.error("Error submitting the quiz. Please try again.");
      console.error(error);
    }
  };

  const uploadImageAndGetURL = async (
    image: File
  ): Promise<string | null | undefined> => {
    try {
      const base64Image = await getBase64FromImageFile(image);
      const response = await axiosInstance.post("/upload/image", {
        image: base64Image,
      });

      if (response.status === 200 && response.data.url) {
        return response.data.url;
      } else {
        toast.error("Error uploading image. Please try again.");
      }
    } catch (error) {
      toast.error("Error uploading image. Please try again.");
      console.error(error);
    }
  };

  const getBase64FromImageFile = (file: File) => {
    return new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String); // Extract base64 data from the string
      };
      reader.onerror = () => {
        resolve(null);
      };
    });
  };

  return (
    <div className="container p-4 mx-auto">
      <button
        title="back button"
        className="bg-base-100 rounded-full p-3 my-3 hover:text-primary"
        onClick={() => router.back()}
      >
        <BsArrowLeftCircleFill />
      </button>
      <h1 className="mb-4 text-2xl font-semibold">
        {type === "create" ? "Create Quiz" : "Edit Quiz"}
      </h1>
      {questions.map((q, questionIndex) => (
        <div key={questionIndex} className="mb-6">
          <label className="block mb-2 font-semibold">
            Question {questionIndex + 1}:
          </label>
          <div className="flex flex-row gap-3 items-center">
            <input
              title="question title"
              type="text"
              className="w-full p-2 border rounded input input-bordered"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(questionIndex, e.target.value)
              }
            />

            <div className="w-fit h-fit z-30 hover:bg-base-100 bg-base-200 shadow rounded-full relative cursor-pointer">
              <input
                title="image"
                type="file"
                accept="image/*"
                className="z-30 w-full h-full cursor-pointer absolute opacity-0"
                onChange={(e) =>
                  handleQuestionImageChange(
                    questionIndex,
                    e.target.files ? e.target.files[0] : null
                  )
                }
              />
              <div className="w-fit h-fit z-10 rounded-full cursor-pointer p-3 ">
                <BsImage />
              </div>
            </div>
          </div>
          {q.questionImage && (
            <img
              alt={`Question ${questionIndex + 1} Image`}
              src={getImageURL(q.questionImage)}
              className="max-w-md mt-2"
            />
          )}

          <div className="divider"></div>
          <div className="mt-3 mb-4">
            <label className="font-semibold">Select Quiz Type:</label>
            {q.isCheckBoxQuiz ? (
              <BsCheckSquareFill className="mx-3 mr-2 inline-block align-text-bottom" />
            ) : (
              <BsCircleFill className="mx-3 mr-2 inline-block align-text-bottom" />
            )}
            <select
              title="question type"
              className="px-8 py-2 ml-2 border rounded w-max select select-bordered"
              value={q.isCheckBoxQuiz ? "checkbox" : "multiple-choice"}
              onChange={(e) =>
                handleQuestionTypeChange(
                  questionIndex,
                  e.target.value === "checkbox"
                )
              }
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="checkbox">Checkbox</option>
            </select>
          </div>
          <div className="flex flex-col gap-3">
            {q.answers.map((answer, answerIndex) => (
              <div
                key={answerIndex}
                className="flex flex-row gap-3 items-center"
              >
                {q.isCheckBoxQuiz ? (
                  <input
                    title="Correct answer"
                    type="checkbox"
                    className="checkbox"
                    checked={q.correctAnswer.includes(answer.text)}
                    onChange={() =>
                      handleCorrectAnswerChange(questionIndex, answerIndex)
                    }
                  />
                ) : (
                  <input
                    title="Correct answer"
                    type="radio"
                    className="radio"
                    name={`correctAnswer-${questionIndex}`}
                    value={answerIndex}
                    checked={q.correctAnswer[0] === answer.text}
                    onChange={() =>
                      handleCorrectAnswerChange(questionIndex, answerIndex)
                    }
                  />
                )}
                <input
                  title="answer"
                  type="text"
                  className="p-2 border rounded input input-bordered"
                  value={answer.text}
                  onChange={(e) =>
                    handleAnswerChange(
                      questionIndex,
                      answerIndex,
                      e.target.value
                    )
                  }
                />
                {q.answers.length > 2 && (
                  <button
                    title="remove answer"
                    className="hover:text-error"
                    onClick={() => removeAnswer(questionIndex, answerIndex)}
                  >
                    <BsXCircleFill size={20} />
                  </button>
                )}
                <div className="w-fit h-fit z-30 hover:bg-base-100 bg-base-200 shadow rounded-full relative cursor-pointer">
                  <input
                    title="image"
                    type="file"
                    accept="image/*"
                    className="z-30 w-full h-full cursor-pointer absolute opacity-0"
                    onChange={(e) =>
                      handleAnswerImageChange(
                        questionIndex,
                        answerIndex,
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                  />
                  <div className="w-fit h-fit z-10 rounded-full cursor-pointer p-3 ">
                    <BsImage />
                  </div>
                </div>
                {answer.image && (
                  <img
                    src={getImageURL(answer.image)}
                    alt={`Question ${questionIndex + 1} Answer ${
                      answerIndex + 1
                    } Image`}
                    className="max-w-xs mt-2"
                  />
                )}
              </div>
            ))}
          </div>
          <button
            className="mt-2 mr-2 btn btn-secondary"
            onClick={() => addAnswer(questionIndex)}
            disabled={q.answers.length >= 4}
          >
            Add Answer
          </button>
          {questions.length > 1 && (
            <button
              className="mt-2 btn hover:text-error"
              onClick={() => removeQuestion(questionIndex)}
            >
              Remove Question
            </button>
          )}
        </div>
      ))}
      <div className="flex flex-row items-center gap-3">
        <button
          className="btn"
          onClick={addQuestion}
          disabled={questions.length >= 30}
        >
          Add Question
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Save Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateQuizPage;
