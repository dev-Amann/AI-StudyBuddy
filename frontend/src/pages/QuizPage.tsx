import { useState } from 'react'
import { motion } from 'framer-motion'
import { FlaskConical, Loader2, CheckCircle, XCircle, Trophy } from 'lucide-react'
import { useApi } from '../hooks/useApi'
import clsx from 'clsx'

export default function QuizPage() {
    const [topic, setTopic] = useState('')
    const [loading, setLoading] = useState(false)
    const [quiz, setQuiz] = useState<any>(null)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [scores, setScores] = useState<number[]>([]) // Store 1 for correct, 0 for wrong
    const [showResult, setShowResult] = useState(false)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)

    const api = useApi()

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!topic) return
        setLoading(true)
        setQuiz(null)
        setScores([])
        setCurrentQuestion(0)
        setShowResult(false)

        try {
            // Mock difficulty for now
            const { data } = await api.post('/quiz/', { topic, difficulty: 'medium' })
            setQuiz(data)
        } catch (err) {
            console.error(err)
            // Error handling
        } finally {
            setLoading(false)
        }
    }

    const handleAnswer = (index: number) => {
        if (isAnswered) return
        setSelectedOption(index)
        setIsAnswered(true)

        const isCorrect = index === quiz.questions[currentQuestion].correct_answer
        const newScores = [...scores]
        newScores[currentQuestion] = isCorrect ? 1 : 0
        setScores(newScores)
    }

    const nextQuestion = () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(curr => curr + 1)
            setSelectedOption(null)
            setIsAnswered(false)
        } else {
            setShowResult(true)
        }
    }

    const totalScore = scores.reduce((a, b) => a + b, 0)

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <FlaskConical className="text-red-500" />
                    Quiz Generator
                </h1>
                <p className="text-slate-500">Gen a quiz to test your mastery of any subject.</p>
            </div>

            {!quiz && !loading && (
                <div className="glass-panel p-6 rounded-2xl bg-white border border-slate-200">
                    <form onSubmit={handleGenerate} className="flex gap-4">
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="Topic for Quiz (e.g. World War II)"
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 shadow-sm placeholder-slate-400"
                        />
                        <button type="submit" disabled={!topic} className="btn-primary from-red-500 to-rose-500">
                            Generate
                        </button>
                    </form>
                </div>
            )}

            {loading && (
                <div className="text-center py-20 text-red-600">
                    <Loader2 className="animate-spin mx-auto mb-4" size={40} />
                    <p>Generating challenging questions...</p>
                </div>
            )}

            {quiz && !showResult && !loading && (
                <div className="glass-card p-8 rounded-2xl border-red-200 bg-white">
                    <div className="mb-6 flex justify-between items-center text-sm text-slate-500">
                        <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
                        <span className="text-red-600 font-medium">{quiz.title}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-8">
                        {quiz.questions[currentQuestion].question}
                    </h3>

                    <div className="space-y-3">
                        {quiz.questions[currentQuestion].options.map((option: string, idx: number) => {
                            const isSelected = selectedOption === idx
                            const isCorrect = idx === quiz.questions[currentQuestion].correct_answer

                            let style = "bg-white border-slate-200 hover:bg-stone-50 text-slate-700"
                            if (isAnswered) {
                                if (isSelected && !isCorrect) style = "bg-red-50 border-red-200 text-red-700"
                                if (isCorrect) style = "bg-emerald-50 border-emerald-200 text-emerald-700"
                            } else if (isSelected) {
                                style = "bg-red-50 border-red-400 text-red-900"
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    disabled={isAnswered}
                                    className={clsx(
                                        "w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center shadow-sm",
                                        style
                                    )}
                                >
                                    <span>{option}</span>
                                    {isAnswered && isCorrect && <CheckCircle size={18} />}
                                    {isAnswered && isSelected && !isCorrect && <XCircle size={18} />}
                                </button>
                            )
                        })}
                    </div>

                    {isAnswered && (
                        <div className="mt-8 flex justify-end">
                            <button onClick={nextQuestion} className="btn-primary from-red-500 to-rose-500">
                                {currentQuestion === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {showResult && (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center glass-panel p-10 rounded-3xl bg-white border border-slate-200"
                >
                    <Trophy className="mx-auto text-red-500 mb-6" size={64} />
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Completed!</h2>
                    <p className="text-slate-500 mb-6">You scored</p>
                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600 mb-8">
                        {Math.round((totalScore / quiz.questions.length) * 100)}%
                    </div>
                    <button
                        onClick={() => {
                            setQuiz(null)
                            setShowResult(false)
                            setTopic('')
                            setScores([])
                            setCurrentQuestion(0)
                        }}
                        className="btn-primary from-slate-200 to-slate-300 text-slate-800 hover:shadow-slate-300/30"
                    >
                        Try Another Topic
                    </button>
                </motion.div>
            )}
        </div>
    )
}
