import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

type Answer = {
    text: string
    isCorrect: boolean
}

type Question = {
    question: string
    answers: Answer[]
    explanation: string
}

export default function Question({ question, index }: { question: Question, index: number }) {

    const correctAnswer = question.answers?.find((answer) => answer.isCorrect)?.text

    const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(undefined)
    const [evaluated, setEvaluated] = useState<boolean>(false)


    function submitAnswer() {
        return () => {
            if (selectedAnswer) {
                setEvaluated(true)
                if (correctAnswer !== selectedAnswer) {
                    toast.error("Špatně")
                }
                if (correctAnswer === selectedAnswer) {
                    toast.success("Správně")
                }
            }
            if (!selectedAnswer) {
                toast.warning("Vyberte odpověď")
            }
        }
    }

    return (
        <div key={crypto.randomUUID()}>
            <div className="flex justify-between mb-5"><h2 className="text-lg font-semibold">{`${index + 1}. ${question.question}`}</h2>
                {evaluated && correctAnswer === selectedAnswer && <Badge className="bg-green-600 hover:bg-green-600 self-center ">Správně</Badge>}
                {evaluated && correctAnswer != selectedAnswer && <Badge variant="destructive" className="self-center ">Špatně</Badge>}
            </div>
            <RadioGroup disabled={evaluated} value={selectedAnswer} onValueChange={(e) => setSelectedAnswer(e)}>
                {question.answers?.map((answer: Answer, i: number) => {
                    return (
                        <div key={`q${index}a${i}`} className={`flex items-center space-x-2 ${evaluated && selectedAnswer === answer.text && correctAnswer != selectedAnswer && "line-through decoration-4 decoration-red-800"}`}>
                            <RadioGroupItem value={answer.text} id={answer.text} />
                            <Label htmlFor={answer.text} className={`${evaluated && correctAnswer === answer.text && "text-green-600"}`}>{answer.text}</Label>
                        </div>
                    )
                })}
            </RadioGroup>
            {!evaluated && <Button variant="outline" className="mt-5" onClick={submitAnswer()}>Zkontrolovat odpověď</Button>}
            {evaluated && <p className="mt-5">{question.explanation}</p>}
            <Separator className="my-4" />
        </div>
    )
}