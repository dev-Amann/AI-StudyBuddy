import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FileText, Upload, File as FileIcon, Loader2, CheckCircle2 } from 'lucide-react'
import { useApi } from '../hooks/useApi'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function SummarizePage() {
    const [file, setFile] = useState<File | null>(null)
    const [summary, setSummary] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const api = useApi()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
            setError('')
        }
    }

    const handleSummarize = async () => {
        if (!file) return

        setLoading(true)
        setError('')
        setSummary('')

        const formData = new FormData()
        formData.append('file', file)

        try {
            const { data } = await api.post('/summarize/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setSummary(data.summary)
        } catch (err: any) {
            console.error(err)
            setError(err.response?.data?.detail || "Failed to summarize PDF. Please ensure it is a valid text-based PDF.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <FileText className="text-red-500" />
                    PDF Summarizer
                </h1>
                <p className="text-slate-500">
                    Upload your lecture notes or textbooks (PDF) and get a quick summary.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <div
                        className="glass-panel p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-red-400 bg-white hover:bg-red-50/30 transition-colors cursor-pointer flex flex-col items-center justify-center h-48 text-center"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf"
                            className="hidden"
                        />

                        {file ? (
                            <div className="space-y-2">
                                <FileIcon className="text-red-500 mx-auto" size={32} />
                                <p className="text-sm font-medium text-slate-700 truncate max-w-[150px]">{file.name}</p>
                                <p className="text-xs text-slate-400">Change file</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Upload className="text-slate-400 mx-auto" size={32} />
                                <p className="text-sm font-medium text-slate-500">Click to Upload PDF</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleSummarize}
                        disabled={!file || loading}
                        className="btn-primary w-full mt-4 bg-gradient-to-r from-red-500 to-rose-500 hover:shadow-red-500/30 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Summarize"}
                    </button>
                </div>

                <div className="md:col-span-2">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl mb-4">
                            {error}
                        </div>
                    )}

                    {summary ? (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-card p-6 rounded-2xl h-full border-red-200 bg-white min-h-[300px]"
                        >
                            <div className="flex items-center gap-2 mb-4 text-red-600 font-medium">
                                <CheckCircle2 size={20} />
                                Summary Generated
                            </div>
                            <div className="prose prose-sm max-w-none text-slate-700">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {summary}
                                </ReactMarkdown>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400 border border-slate-200 rounded-2xl bg-white min-h-[300px]">
                            <p>Summary will appear here...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
