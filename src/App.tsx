import questions from "./assets/questions.json"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

import './App.css'

function App() {

  return (
    <div className="w-full max-w-[620px] mx-auto">
      {questions.map((question, index) => {
        return (
          <div key={crypto.randomUUID()}>
            <h2 className="text-xl font-semibold mb-4">{`${index + 1}. ${question.question}`}</h2>
            <ul>
              {question.answers?.map((answer, index) => {
                return (
                  <li key={crypto.randomUUID()}>
                    <input type="radio" name={question.question} value={answer.text} />
                    <label>{answer.text}</label>
                  </li>
                )
              })}
            </ul>
            <Button variant="outline" className="mt-4">Vyhodnotit</Button>
            <Separator className="my-4" />
          </div>
        )
      })}

    </div>
  )
}

export default App
