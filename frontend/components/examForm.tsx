import axiosInstance from '@/axios.config'
import { set } from 'mongoose'
import React, { useState } from 'react'

function ExamForm() {
    const[exam,setExam]=useState([])
    const[question,setQuestion]=useState("")
    const[answer1,setAnswer1]=useState("")
    const[answer2,setAnswer2]=useState("")
    const[answer3,setAnswer3]=useState("")
    const[answer4,setAnswer4]=useState("")
    const[correctAnswer,setCorrectAnswer]=useState("")
    const addQuestionToExam = function (e) {
        e.preventDefault()
        if (!question || !answer1 || !answer2 || !answer3 || !answer4 || !correctAnswer) {
            return  
            // use tostify
        } 
        setExam(prev => [...prev, {question,answers:[answer1,answer2,answer3,answer4],correctAnswer}])
        setQuestion("")
        setAnswer1("")
        setAnswer2("")
        setAnswer3("")
        setAnswer4("")
        setCorrectAnswer("")
    }
    const addExam = async()=>{
        try {       
            const {data} = await axiosInstance.put(`/exam/${lessonId}/add-exam`,exam)
            console.log(data)
        } catch (error) {
            // tostify
        }
    }
  return (
    <>
    <form action="" onSubmit={addQuestionToExam}>
    <input type="text" placeholder='question' onChange={e => setQuestion(e.target.value)}   />
    
    <input type="radio" name="correctAnswer" onChange={e => setCorrectAnswer(answer1)} />
    <input type="text" placeholder='answer' onChange={e => setAnswer1(e.target.value)}    />
    <br />
    <input type="radio" name="correctAnswer" onChange={e => setCorrectAnswer(answer2)} />
    <input type="text" placeholder='answer' onChange={e => setAnswer2(e.target.value)}    />
    <br />
    <input type="radio" name="correctAnswer" onChange={e => setCorrectAnswer(answer3)} />
    <input type="text" placeholder='answer' onChange={e => setAnswer3(e.target.value)}    />
    <br />
    <input type="radio" name="correctAnswer" onChange={e => setCorrectAnswer(answer4)} />
    <input type="text" placeholder='answer' onChange={e => setAnswer4(e.target.value)}    />
    <button>add next question</button>
    </form>
    <button onClick={addExam}>add exam</button>
    </>

  )
}

export default ExamForm