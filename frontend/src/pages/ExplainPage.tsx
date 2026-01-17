import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Sparkles, Loader2 } from 'lucide-react'
import { useApi } from '../hooks/useApi'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ExplainPage() {
    const [topic, setTopic] = useState('')
    const [explanation, setExplanation] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const api = useApi()

    const handleExplain = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!topic.trim()) return

        setLoading(true)
        setError('')
        setExplanation('')

        try {
            const { data } = await api.post('/explain/', { topic })
            setExplanation(data.explanation)
        } catch (err: any) {
            console.error(err)
            setError(err.response?.data?.detail || "Failed to get explanation. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <BookOpen className="text-rose-500" />
                    Explain Topic
                </h1>
                <p className="text-slate-500">
                    Enter a complex topic and let our AI break it down into simple terms for you.
                </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl bg-white border border-slate-200">
                <form onSubmit={handleExplain} className="flex gap-4 flex-col md:flex-row">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="E.g., Quantum Physics, Photosynthesis, The French Revolution"
                        className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all shadow-sm"
                    />
                    <button
                        type="submit"
                        disabled={loading || !topic}
                        className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed from-rose-500 to-red-500"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                        Simplifier
                    </button>
                </form>
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl"
                >
                    {error}
                </motion.div>
            )}

            {explanation && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 rounded-2xl border-rose-200 shadow-xl shadow-rose-500/5 bg-white"
                >
                    <div className="prose prose-slate max-w-none">
                        <div className="prose prose-slate max-w-none text-slate-700">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {explanation}
                            </ReactMarkdown>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
