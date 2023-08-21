type Props = {
  title: string | null
  timer: number
  handleStartQuiz: () => void
}

const StartQuiz: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 mt-4 text-3xl font-semibold text-center">
        Quiz Name: {props.title || "Quiz"}
      </h1>
      <p className="mb-4 text-lg text-center">Duration: {props.timer}</p>
      <ul>
        <li>When you start, you can't exit, or the exam will be submitted.</li>
        <li>The exam will be submitted after the timer is up.</li>
      </ul>
      <button className="btn btn-primary" onClick={props.handleStartQuiz}>
        Start Quiz
      </button>
    </div>
  )
}

export default StartQuiz
