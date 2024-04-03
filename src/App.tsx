import { useState, useEffect, useCallback } from "react"
import { usePostMessageWithHeight } from './hooks/usePostHeightMessage'

import questions from "./assets/questions.json"

import Question from "./components/Question"
import { Toaster } from "@/components/ui/sonner"


import './App.css'

function App() {

  const [results, setResults] = useState<{ question: number; correct: boolean; selectedAnswer: string, evaluated: boolean }[]>([]);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const { containerRef, postHeightMessage } = usePostMessageWithHeight(`eu-kviz`);


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

  useEffect(() => {
    function handleWindowMessage(event: MessageEvent) {
      setTransform({ x: 0, y: event.data.top < 0 ? Math.abs(event.data.top) : 0 });
    }

    window.addEventListener('message', handleWindowMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('message', handleWindowMessage);
    };
  }, []);


  return (
    <div ref={containerRef} className="w-full max-w-[620px] mx-auto">
      {questions.map((question, index) => {
        return <Question key={crypto.randomUUID()} question={question} index={index} evaluated={results.find(result => result.question === index)?.evaluated || false} correct={results.find(result => result.question === index)?.correct} selectedAnswer={results.find(result => result.question === index)?.selectedAnswer} updateResults={updateResults} results={results} />
      })}
      <Toaster position="top-center" style={{ transform: `translate(${transform.x}px, ${transform.y}px)` }} toastOptions={{
        classNames: {
          error: 'bg-red-50 text-red-700',
          success: 'bg-green-50 text-green-700',
          warning: 'bg-yellow-50 text-yellow-700',
          info: 'bg-blue-50 text-blue-700',
        },
      }} />

    </div>
  )
}

export default App
