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



export default function Question({ question, index, evaluated, correct, selectedAnswer, updateResults }: { question: Question, index: number, evaluated: boolean, correct: boolean | undefined, selectedAnswer: string | undefined, updateResults: Function }) {

    const correctAnswer = question.answers?.find((answer) => answer.isCorrect)?.text


    function submitAnswer() {
        return () => {
            if (!selectedAnswer) {
                toast.warning("Vyberte odpověď")
            }
            if (selectedAnswer) {
                if (correctAnswer !== selectedAnswer) {
                    toast.error("Špatně")
                }
                if (correctAnswer === selectedAnswer) {
                    toast.success("Správně")
                }
                updateResults(index, selectedAnswer === correctAnswer, selectedAnswer, true)
            }
        }
    }

    return (
        <div key={crypto.randomUUID()}>
            <div className="flex justify-between mb-5"><h2 className="text-lg font-semibold">{`${index + 1}. ${question.question}`}</h2>
                {evaluated && correct && <Badge className="bg-green-600 hover:bg-green-600 self-center ">Správně</Badge>}
                {evaluated && !correct && <Badge variant="destructive" className="self-center ">Špatně</Badge>}
            </div>
            <RadioGroup disabled={evaluated} value={selectedAnswer} onValueChange={(e) => updateResults(index, e === correctAnswer, e, false)}>
                {question.answers?.map((answer: Answer, i: number) => {
                    return (
                        <div key={`q${index}a${i}`} className={`flex items-center space-x-2 ${evaluated && !correct && selectedAnswer === answer.text && "line-through decoration-4 decoration-red-800"}`}>
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