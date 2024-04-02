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

    const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(undefined)
    const [evaluated, setEvaluated] = useState<boolean>(false)


    function submitAnswer() {
        return () => {
            if (selectedAnswer) {
                setEvaluated(true)
                toast.success("Odpověď odeslána")
            }
            if (!selectedAnswer) {
                toast.warning("Vyberte odpověď")
            }
        }
    }

    return (
        <div key={crypto.randomUUID()}>
            <h2 className="text-xl font-semibold mb-5">{`${index + 1}. ${question.question}`}</h2>
            <RadioGroup value={selectedAnswer} onValueChange={(e) => setSelectedAnswer(e)}>
                {question.answers?.map((answer: Answer, i: number) => {
                    return (
                        <div key={`q${index}a${i}`} className="flex items-center space-x-2">
                            <RadioGroupItem value={answer.text} id={answer.text} />
                            <Label htmlFor={answer.text}>{answer.text}</Label>
                        </div>
                    )
                })}
            </RadioGroup>
            {!evaluated && <Button variant="outline" className="mt-5" onClick={submitAnswer()}>Zkontrolovat odpověď</Button>}
            <Separator className="my-4" />
        </div>
    )
}