// import axiosInstance from "@/axios.config";
// import { set } from "mongoose";
// import React, { useState, useEffect } from "react";

// function ExamForm() {
//   const [exam, setExam] = useState([]);
//   const [submitedExam, setSubmitedExam] = useState([]);
//   // number of question
//   const [number, setNumber] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState("");
//   useEffect(() => {
//     try {
//       const { data } = axiosInstance.get(`/lesson/${lessonId}/get-lesson`);
//       //  or you can pass exam array to here from lesson object from lesson page
//       setExam(data.exam);
//     } catch (error) {
//       // use tostify
//     }
//   }, []);
//   const nextQuestion = () => {
//     if(!selectedAnswer){
//       alert("please select an answer")
//       return;
//     //   use tostify
//     }
//     setSubmitedExam(prev => [...prev, {correctAnswer:exam[number].correctAnswer , answer:selectedAnswer}])
//     setSelectedAnswer("")
//     setNumber(prev => prev + 1)
//   };
//   const submitExam = () => {
//     // send submitedExam to server
//     const { data } = axiosInstance.put(`/exam/${lessonId}`,submitedExam);
//     console.log(submitedExam)
//     // use tostify
//   }
//   return (
//     <>
//       <p>{exam[number].question}</p>
//       <div>
//         {exam[number].answers.map((answer) => {
//           return (
//             <button onClick={() => setSelectedAnswer(answer)}>{answer}</button>
//           );
//         })}
//       </div>
//       {/* change variable number to change the object in exam array  */}
//       <button onClick={nextQuestion}>next question</button>
//       {exam.length === number + 1 && return(
//         <button onClick={submitExam}>submit exam</button>
//       )}
//     </>
//   );
// }

// export default ExamForm;
