import axiosInstance from "@/axios.config"
import { useParams } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface Answer {
  text: string
  image: File | null
}

interface Question {
  question: string
  questionImage: File | null
  answers: Answer[]
  correctAnswer: string[] // Array of answer texts
  isCheckboxQuiz: boolean
}

const CreateQuizPage = ({ lessonId }: { lessonId: string }) => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: "",
      questionImage: null,
      answers: [
        { text: "", image: null },
        { text: "", image: null },
      ],
      correctAnswer: [],
      isCheckboxQuiz: false,
    },
  ])

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
          isCheckboxQuiz: false,
        },
      ])
    } else {
      toast.error("You have reached the maximum limit of 30 questions.")
    }
  }

  const removeQuestion = (questionIndex: number) => {
    if (questions.length > 1) {
      const exams = [...questions]
      exams.splice(questionIndex, 1)
      setQuestions(exams)
    } else {
      toast.error("You must have at least one question in the quiz.")
    }
  }

  const addAnswer = (questionIndex: number) => {
    if (questions[questionIndex].answers.length < 4) {
      const exams = [...questions]
      exams[questionIndex].answers.push({ text: "", image: null })
      setQuestions(exams)
    }
  }

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    if (questions[questionIndex].answers.length > 2) {
      const exams = [...questions]
      exams[questionIndex].answers.splice(answerIndex, 1)
      setQuestions(exams)
    }
  }

  const handleQuestionChange = (index: number, value: string) => {
    const exams = [...questions]
    exams[index].question = value
    setQuestions(exams)
  }

  const handleQuestionImageChange = (questionIndex: number, file: File) => {
    const exams = [...questions]
    exams[questionIndex].questionImage = file
    setQuestions(exams)
  }

  const handleAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    value: string
  ) => {
    const exams = [...questions]
    exams[questionIndex].answers[answerIndex].text = value
    setQuestions(exams)
  }

  const handleAnswerImageChange = (
    questionIndex: number,
    answerIndex: number,
    file: File
  ) => {
    const exams = [...questions]
    exams[questionIndex].answers[answerIndex].image = file
    setQuestions(exams)
  }

  const handleQuestionTypeChange = (
    questionIndex: number,
    isCheckbox: boolean
  ) => {
    const exams = [...questions]
    exams[questionIndex].isCheckboxQuiz = isCheckbox
    if (!isCheckbox) {
      exams[questionIndex].correctAnswer = [] // Reset the correct answer when switching to radio button
    }
    setQuestions(exams)
  }

  const handleCorrectAnswerChange = (
    questionIndex: number,
    answerIndex: number
  ) => {
    const exams = [...questions]
    if (questions[questionIndex].isCheckboxQuiz) {
      const selectedAnswers = exams[questionIndex].correctAnswer
      const selectedAnswerText =
        questions[questionIndex].answers[answerIndex].text
      if (!selectedAnswers.includes(selectedAnswerText)) {
        selectedAnswers.push(selectedAnswerText)
      } else {
        const index = selectedAnswers.indexOf(selectedAnswerText)
        selectedAnswers.splice(index, 1)
      }
    } else {
      exams[questionIndex].correctAnswer = [
        questions[questionIndex].answers[answerIndex].text,
      ]
    }
    setQuestions(exams)
  }

  const handleSubmit = async () => {
    const isEmptyQuestion = questions.some((q) => q.question.trim() === "")
    if (isEmptyQuestion) {
      toast.error("Please fill in all questions before submitting.")
      return
    }

    const hasEmptyAnswer = questions.some((q) =>
      q.answers.some((answer) => answer.text.trim() === "")
    )
    if (hasEmptyAnswer) {
      toast.error("Please fill in all answers before submitting.")
      return
    }

    const hasLessThanTwoAnswers = questions.some((q) => q.answers.length < 2)
    if (hasLessThanTwoAnswers) {
      toast.error("Each question must have at least two answers.")
      return
    }

    try {
      // Convert images to base64
      const exams = await Promise.all(
        questions.map(async (q) => ({
          ...q,
          questionImage: q.questionImage
            ? await getBase64FromImageFile(q.questionImage)
            : null,
          answers: await Promise.all(
            q.answers.map(async (answer) => ({
              ...answer,
              image: answer.image
                ? await getBase64FromImageFile(answer.image)
                : null,
            }))
          ),
        }))
      )

      // Validate that all questions have at least one correct answer
      const hasNoCorrectAnswer = exams.some((q) => q.correctAnswer.length === 0)
      if (hasNoCorrectAnswer) {
        toast.error(
          "Please select at least one correct answer for each question."
        )
        return
      }

      // Save exams to exam array

      console.log(exams)

      // Make the PUT request to the API endpoint using axiosInstance.put()
      const response = await axiosInstance.put(
        `/exam/${lessonId}/add-exam`,
        exams
      )

      // Handle the response from the API
      if (response.status === 200) {
        // Exam successfully created
        toast.success("Quiz successfully created!")
        // Clear the questions and reset the form after successful submission
        setQuestions([
          {
            question: "",
            questionImage: null,
            answers: [
              { text: "", image: null },
              { text: "", image: null },
            ],
            correctAnswer: [],
            isCheckboxQuiz: false,
          },
        ])
        // You can also redirect the user to a different page after successful submission if needed.
      } else {
        // Handle other response status codes or error scenarios from the API
        toast.error("Error submitting the quiz. Please try again.")
      }
    } catch (error: any) {
      toast.error("Error submitting the quiz. Please try again.")
      console.error(error)
    }
  }

  const getBase64FromImageFile = (file: File) => {
    return new Promise<string | null>((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        const base64String = reader.result as string
        resolve(base64String) // Extract base64 data from the string
      }
      reader.onerror = () => {
        resolve(null)
      }
    })
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-semibold">Create Quiz</h1>
      {questions.map((q, questionIndex) => (
        <div key={questionIndex} className="mb-6">
          <label className="block mb-2 font-semibold">
            Question {questionIndex + 1}:
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded input input-bordered"
            value={q.question}
            onChange={(e) =>
              handleQuestionChange(questionIndex, e.target.value)
            }
          />
          {q.questionImage && (
            <img
              src={URL.createObjectURL(q.questionImage)}
              alt={`Question ${questionIndex + 1} Image`}
              className="max-w-md mt-2"
            />
          )}
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered"
            onChange={(e) =>
              handleQuestionImageChange(questionIndex, e.target.files[0])
            }
          />
          <div className="mb-4">
            <label className="font-semibold">Select Quiz Type:</label>
            <select
              className="px-8 py-2 ml-2 border rounded w-max select select-bordered"
              value={q.isCheckboxQuiz ? "checkbox" : "multiple-choice"}
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
          {q.answers.map((answer, answerIndex) => (
            <div key={answerIndex}>
              {q.isCheckboxQuiz ? (
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={q.correctAnswer.includes(answer.text)}
                  onChange={() =>
                    handleCorrectAnswerChange(questionIndex, answerIndex)
                  }
                />
              ) : (
                <input
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
                type="text"
                className="p-2 border rounded input input-bordered"
                value={answer.text}
                onChange={(e) =>
                  handleAnswerChange(questionIndex, answerIndex, e.target.value)
                }
              />
              {answer.image && (
                <img
                  src={URL.createObjectURL(answer.image)}
                  alt={`Question ${questionIndex + 1} Answer ${
                    answerIndex + 1
                  } Image`}
                  className="max-w-md mt-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered"
                onChange={(e) =>
                  handleAnswerImageChange(
                    questionIndex,
                    answerIndex,
                    e.target.files[0]
                  )
                }
              />
              {q.answers.length > 2 && (
                <button
                  className="mt-2 btn btn-danger"
                  onClick={() => removeAnswer(questionIndex, answerIndex)}
                >
                  Remove Answer
                </button>
              )}
            </div>
          ))}
          <button
            className="mt-2 mr-2 btn btn-secondary"
            onClick={() => addAnswer(questionIndex)}
            disabled={q.answers.length >= 4}
          >
            Add Answer
          </button>
          {questions.length > 1 && (
            <button
              className="mt-2 btn btn-danger"
              onClick={() => removeQuestion(questionIndex)}
            >
              Remove Question
            </button>
          )}
        </div>
      ))}
      <button
        className="btn"
        onClick={addQuestion}
        disabled={questions.length >= 30}
      >
        Add Question
      </button>
      <button className="mt-4 btn btn-primary" onClick={handleSubmit}>
        Save Quiz
      </button>
    </div>
  )
}

export default CreateQuizPage
