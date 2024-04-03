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

type Result = {
    question: number
    correct: boolean
    selectedAnswer: string
    evaluated: boolean
}


export default function Question({ question, index, evaluated, correct, selectedAnswer, updateResults, results }: { question: Question, index: number, evaluated: boolean, correct: boolean | undefined, selectedAnswer: string | undefined, updateResults: Function, results: Result[] }) {

    const correctAnswer = question.answers?.find((answer) => answer.isCorrect)?.text


    function submitAnswer() {
        return () => {
            if (!selectedAnswer) {
                toast.warning("Vyberte odpověď")
            }
            if (selectedAnswer) {
                if (correctAnswer !== selectedAnswer) {
                    toast.error("Špatně!<br/>Máte úspěšnost " + (results.filter(result => result.correct).length / results.length * 100).toFixed(0) + " %")
                }
                if (correctAnswer === selectedAnswer) {
                    toast.success("Správně!<br/>Máte úspěšnost " + (results.filter(result => result.correct).length / results.length * 100).toFixed(0) + " %")
                }
                updateResults(index, selectedAnswer === correctAnswer, selectedAnswer, true)
            }
        }
    }

    return (
        <div key={crypto.randomUUID()}>
            <div className="flex justify-between mb-5 items-center">
                <div className="flex gap-2 items-center">
                    <div className="text-lg font-semibold bg-[#001489] text-[#FFDD00] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">{index + 1}</div>
                    <h2 className="text-xl font-semibold flex-grow-0">{question.question}</h2>
                </div>
                <div className="flex-shrink-0">
                    {evaluated && correct && <Badge className="bg-green-600 hover:bg-green-600 self-center text-base">Správně</Badge>}
                    {evaluated && !correct && <Badge variant="destructive" className="self-center ml-2 text-base">Špatně</Badge>}
                    {!evaluated && <Badge className="invisible text-base">Správně</Badge>}
                </div>
            </div>
            <div className="ml-2">
                <RadioGroup disabled={evaluated} value={selectedAnswer} onValueChange={(e) => updateResults(index, e === correctAnswer, e, false)}>
                    {question.answers?.map((answer: Answer, i: number) => {
                        return (
                            <div key={`q${index}a${i}`} className={`cursor-pointer flex items-center space-x-2 ${evaluated && !correct && selectedAnswer === answer.text && "line-through decoration-4 decoration-red-800"}`}>
                                <RadioGroupItem value={answer.text} id={`q${index}a${i}`} />
                                <Label htmlFor={`q${index}a${i}`} className={`${!evaluated && "cursor-pointer"} text-lg ${evaluated && correctAnswer === answer.text && "text-green-600"}`}>{answer.text}</Label>
                            </div>
                        )
                    })}
                </RadioGroup>
            </div>
            {!evaluated && <Button variant="outline" className="mt-5 cursor-pointer" onClick={submitAnswer()}>Zkontrolovat odpověď</Button>}
            {evaluated && <p className="mt-5">{question.explanation}</p>}
            <Separator className="mt-6 mb-8" />
        </div>
    )
}