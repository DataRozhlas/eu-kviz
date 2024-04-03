import { useState, useEffect, useCallback } from "react"
import { usePostMessageWithHeight } from './hooks/usePostHeightMessage'

import questions from "./assets/questions.json"

import Question from "./components/Question"


import './App.css'


function App() {

  const [results, setResults] = useState<{ question: number; correct: boolean; selectedAnswer: string, evaluated: boolean }[]>([]);
  const { containerRef, postHeightMessage } = usePostMessageWithHeight(`rozdeleni-evropou-kalkulacka`);


  const updateResults = useCallback((index: number, correct: boolean, selectedAnswer: string, evaluated: boolean) => {
    setResults(prev => {
      // check if the question already exists in the results array
      const existing = prev.findIndex(result => result.question === index);
      // if it does, replace it with the new result
      if (existing > -1) {
        return [...prev.slice(0, existing), { question: index, correct, selectedAnswer, evaluated }, ...prev.slice(existing + 1)];
      }
      // if it doesn't, add it to the array
      return [...prev, { question: index, correct, selectedAnswer, evaluated }];
    })
  }, []);

  useEffect(() => {
    postHeightMessage();
  }, [results]);



  return (
    <div ref={containerRef} className="w-full max-w-[620px] mx-auto">
      {questions.map((question, index) => {
        return <Question key={crypto.randomUUID()} question={question} index={index} evaluated={results.find(result => result.question === index)?.evaluated || false} correct={results.find(result => result.question === index)?.correct} selectedAnswer={results.find(result => result.question === index)?.selectedAnswer} updateResults={updateResults} results={results} />
      })}

    </div>
  )
}

export default App
