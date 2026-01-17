import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, User, Bot, MessageSquare, Plus, Trash2, History } from 'lucide-react'
import { useApi } from '../hooks/useApi'
import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
    role: 'user' | 'assistant'
    content: string
}

interface Session {
    id: string
    title: string
    updated_at: string
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [sessions, setSessions] = useState<Session[]>([])
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const api = useApi()

    useEffect(() => {
        fetchSessions()
    }, [])

    useEffect(() => {
        if (currentSessionId) {
            fetchMessages(currentSessionId)
        } else {
            setMessages([])
        }
    }, [currentSessionId])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const fetchSessions = async () => {
        try {
            const { data } = await api.get('/chat/sessions')
            setSessions(data)
            // Optionally load the most recent session
            // if (data.length > 0 && !currentSessionId) setCurrentSessionId(data[0].id)
        } catch (err) {
            console.error("Failed to fetch sessions", err)
        }
    }

    const fetchMessages = async (sessionId: string) => {
        try {
            const { data } = await api.get(`/chat/${sessionId}`)
            setMessages(data)
        } catch (err) {
            console.error("Failed to fetch messages", err)
        }
    }

    const createNewChat = () => {
        setCurrentSessionId(null)
        setMessages([])
    }

    const deleteSession = async (e: React.MouseEvent, sessionId: string) => {
        e.stopPropagation()
        if (!confirm("Are you sure you want to delete this chat?")) return

        try {
            await api.delete(`/chat/${sessionId}`)
            setSessions(prev => prev.filter(s => s.id !== sessionId))
            if (currentSessionId === sessionId) {
                createNewChat()
            }
        } catch (err) {
            console.error("Failed to delete session", err)
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || loading) return

        const userMsg = { role: 'user' as const, content: input }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setLoading(true)

        try {
            let response;
            if (currentSessionId) {
                // Continue existing session
                response = await api.post(`/chat/${currentSessionId}`, { message: userMsg.content })
            } else {
                // Start new session
                response = await api.post('/chat/', { message: userMsg.content })
                setCurrentSessionId(response.data.session_id)
                fetchSessions() // Refresh list to show new title
            }

            setMessages(prev => [...prev, { role: 'assistant', content: response.data.message.content }])

        } catch (err) {
            console.error("Failed to send message", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] flex rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
            {/* Sidebar */}
            <div className="w-64 bg-stone-50 border-r border-slate-200 hidden md:flex flex-col">
                <div className="p-4 border-b border-slate-200">
                    <button
                        onClick={createNewChat}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-all font-semibold text-sm shadow-sm active:scale-95"
                    >
                        <Plus size={18} />
                        New Chat
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                    <p className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">History</p>
                    {sessions.length === 0 && (
                        <div className="text-center py-8 text-slate-400 text-xs">No history yet</div>
                    )}
                    {sessions.map(session => (
                        <div
                            key={session.id}
                            onClick={() => setCurrentSessionId(session.id)}
                            className={clsx(
                                "group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border",
                                currentSessionId === session.id
                                    ? "bg-white border-rose-200 shadow-sm"
                                    : "bg-transparent border-transparent hover:bg-white hover:border-slate-100"
                            )}
                        >
                            <MessageSquare size={16} className={clsx(
                                "shrink-0",
                                currentSessionId === session.id ? "text-rose-500" : "text-slate-400 group-hover:text-slate-500"
                            )} />
                            <div className="flex-1 min-w-0">
                                <p className={clsx(
                                    "text-sm font-medium truncate",
                                    currentSessionId === session.id ? "text-slate-800" : "text-slate-600"
                                )}>
                                    {session.title}
                                </p>
                            </div>
                            <button
                                onClick={(e) => deleteSession(e, session.id)}
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-200 bg-slate-100/50">
                    <div className="flex items-center gap-2 text-slate-500">
                        <History size={14} />
                        <span className="text-xs font-medium">Chat History</span>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3 bg-white/80 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shadow-inner">
                            <Bot className="text-rose-600" size={20} />
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-800">AI Tutor</h2>
                            <p className="text-xs text-slate-500 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Online
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-300">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60">
                            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center border border-slate-100">
                                <Bot size={40} className="text-slate-300" />
                            </div>
                            <div className="max-w-xs">
                                <h3 className="text-lg font-bold text-slate-700 mb-2">How can I help you today?</h3>
                                <p className="text-sm text-slate-500">I can help you understand topics, write code, or practice for your exams.</p>
                            </div>
                        </div>
                    )}

                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={clsx(
                                "flex gap-4 max-w-[85%]",
                                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                            )}
                        >
                            <div className={clsx(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm",
                                msg.role === 'user' ? "bg-rose-500" : "bg-white border border-slate-200"
                            )}>
                                {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-slate-600" />}
                            </div>

                            <div className={clsx(
                                "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                                msg.role === 'user'
                                    ? "bg-rose-500 text-white rounded-tr-sm"
                                    : "bg-stone-50 text-slate-800 rounded-tl-sm border border-slate-100"
                            )}>
                                <div className={clsx("prose prose-sm max-w-none break-words", msg.role === 'user' ? "prose-invert" : "prose-slate")}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {loading && (
                        <div className="flex gap-4 max-w-[80%] mr-auto">
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                                <Bot size={16} className="text-slate-600" />
                            </div>
                            <div className="bg-white p-4 rounded-2xl rounded-tl-sm flex items-center gap-2 border border-slate-100 shadow-sm">
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75" />
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-white border-t border-slate-100">
                    <form onSubmit={handleSend} className="relative flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask your tutor anything..."
                            className="w-full bg-stone-50 border border-slate-200 rounded-xl pl-4 pr-14 py-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm placeholder-slate-400"
                        />
                        <button
                            type="submit"
                            disabled={!input || loading}
                            className="absolute right-2 p-2 bg-rose-500 rounded-lg text-white hover:bg-rose-600 disabled:opacity-50 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                        </button>
                    </form>
                    <p className="text-center text-[10px] text-slate-400 mt-2">
                        AI can make mistakes. Please verify important information.
                    </p>
                </div>
            </div>
        </div>
    )
}
