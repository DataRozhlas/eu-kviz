import questions from "./assets/questions.json"

import Question from "./components/Question"


import './App.css'

function App() {

  return (
    <div className="w-full max-w-[620px] mx-auto">
      {questions.map((question, index) => {
        return <Question key={crypto.randomUUID()} question={question} index={index} />
      })}

    </div>
  )
}

export default App
