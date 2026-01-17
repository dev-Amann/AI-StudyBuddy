import { Link } from 'react-router-dom'
import { BookOpen, Brain, FileText, FlaskConical, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const FeatureCard = ({ icon: Icon, title, description, to, color, delay }: any) => (
    <Link to={to} className="block group h-full">
        <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="h-full p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-violet-500/10 hover:border-violet-300 transition-all duration-300 flex flex-col relative overflow-hidden"
        >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <Icon size={28} />
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-violet-600 transition-colors">{title}</h3>
            <p className="text-slate-500 text-sm mb-6 flex-1 leading-relaxed">{description}</p>

            <div className="flex items-center text-sm font-semibold text-violet-600 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Get Started <ArrowRight size={16} className="ml-2" />
            </div>

            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-violet-500/5 rounded-full blur-3xl group-hover:bg-violet-500/10 transition-all duration-500" />
        </motion.div>
    </Link>
)

export default function Dashboard() {
    return (
        <div className="max-w-6xl mx-auto py-6">
            <div className="mb-12">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
                    Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-purple-500">Scholar!</span>
                </h1>
                <p className="text-slate-500 text-lg max-w-2xl">
                    Ready to accelerate your learning? varied tools to help you master any subject.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <FeatureCard
                    icon={BookOpen}
                    title="Topic Simplifier"
                    description="Get concise, easy-to-understand explanations for complex topics. Perfect for quick reviews or learning new concepts from scratch."
                    to="/dashboard/explain"
                    color="bg-violet-100 text-violet-600"
                    delay={0.1}
                />
                <FeatureCard
                    icon={FileText}
                    title="PDF Summarizer"
                    description="Upload research papers or textbooks and get instant, intelligent summaries. Extract key points and save hours of reading."
                    to="/dashboard/summarize"
                    color="bg-purple-100 text-purple-600"
                    delay={0.2}
                />
                <FeatureCard
                    icon={FlaskConical}
                    title="Quiz Generator"
                    description="Test your mastery. Generate custom quizzes from any text or topic to reinforce your knowledge and identify gaps."
                    to="/dashboard/quiz"
                    color="bg-violet-100 text-violet-600"
                    delay={0.3}
                />
                <FeatureCard
                    icon={Brain}
                    title="Flashcard Creator"
                    description="Turn your notes into digital flashcards for effective spaced repetition. The optimal way to memorize terms and definitions."
                    to="/dashboard/flashcards"
                    color="bg-violet-100 text-violet-600"
                    delay={0.4}
                />
            </div>
        </div>
    )
}

