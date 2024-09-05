const addExamDegreeFunction = (exam , lesson)=>{
    let degree = 0
    exam.map(item => {
        if (item.isCheckBoxQuiz) {
            const correct = item.selectedAnswer.map(answer => item.correctAnswer.includes(answer) ? true : false)
            const trueAnswers = correct.filter(item => item === true)
            degree = degree + (trueAnswers.length / item.correctAnswer.length)
        }
        else {
            if (item.selectedAnswer[0] === item.correctAnswer[0]) {
                degree++
            }
        }
        return degree
    })
    const examAnswer = exam.map(singleExam => {
        const filteredExam = lesson.exams.filter(e => e._id.toString() === singleExam.id);
        if (filteredExam.length > 0) {
            return {question:filteredExam[0].question,questionImage:filteredExam[0].questionImage,answers:filteredExam[0].answers,correctAnswer:filteredExam[0].correctAnswer,isCheckBoxQuiz:filteredExam[0].isCheckBoxQuiz || singleExam.isCheckBoxQuiz,selectedAnswer:singleExam.selectedAnswer}
        }
        return singleExam
    });
    degree = Math.round((degree / exam.length) * 100)
    return {degree , examAnswer}
}
module.exports = {addExamDegreeFunction}