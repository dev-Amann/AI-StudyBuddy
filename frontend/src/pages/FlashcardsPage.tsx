import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Loader2, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react'
import { useApi } from '../hooks/useApi'

interface Flashcard {
    front: string
    back: string
}

export default function FlashcardsPage() {
    const [topic, setTopic] = useState('')
    const [loading, setLoading] = useState(false)
    const [cards, setCards] = useState<Flashcard[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)

    const api = useApi()

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!topic) return
        setLoading(true)
        setCards([])
        setCurrentIndex(0)
        setIsFlipped(false)

        try {
            const { data } = await api.post('/flashcards/', { topic })
            setCards(data.flashcards)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            setIsFlipped(false)
            setTimeout(() => setCurrentIndex(c => c + 1), 200) // Wait for flip back
        }
    }

    const handlePrev = () => {
        if (currentIndex > 0) {
            setIsFlipped(false)
            setTimeout(() => setCurrentIndex(c => c - 1), 200)
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <Brain className="text-amber-500" />
                    Flashcard Creator
                </h1>
                <p className="text-slate-500">Master terminology with auto-generated flashcards.</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl bg-white border border-slate-200">
                <form onSubmit={handleGenerate} className="flex gap-4">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Subject (e.g. Spanish Vocabulary, React Hooks)"
                        className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-sm placeholder-slate-400"
                    />
                    <button type="submit" disabled={loading || !topic} className="btn-primary from-amber-500 to-orange-500">
                        {loading ? <Loader2 className="animate-spin" /> : "Create Cards"}
                    </button>
                </form>
            </div>

            {cards.length > 0 && (
                <div className="flex flex-col items-center gap-8 py-10">
                    <div className="w-full max-w-lg aspect-[3/2] perspective-1000">
                        <motion.div
                            className="w-full h-full relative preserve-3d cursor-pointer"
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                            onClick={() => setIsFlipped(!isFlipped)}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Front */}
                            <div className="absolute w-full h-full backface-hidden bg-white border-2 border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center shadow-2xl shadow-slate-200">
                                <span className="text-amber-500 text-sm font-bold uppercase tracking-wider mb-4">Term</span>
                                <h3 className="text-3xl font-bold text-slate-900">{cards[currentIndex].front}</h3>
                                <div className="absolute bottom-6 right-6 text-slate-400 flex items-center gap-2 text-sm">
                                    <RotateCw size={16} /> Click to flip
                                </div>
                            </div>

                            {/* Back */}
                            <div
                                className="absolute w-full h-full backface-hidden bg-amber-50 border-2 border-amber-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center shadow-2xl backdrop-blur-xl"
                                style={{ transform: "rotateY(180deg)" }}
                            >
                                <span className="text-amber-600 text-sm font-bold uppercase tracking-wider mb-4">Definition</span>
                                <p className="text-xl text-slate-800 leading-relaxed">{cards[currentIndex].back}</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-colors shadow-sm"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <div className="text-slate-500 font-medium font-mono">
                            {currentIndex + 1} / {cards.length}
                        </div>
                        <button
                            onClick={handleNext}
                            disabled={currentIndex === cards.length - 1}
                            className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-colors shadow-sm"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
