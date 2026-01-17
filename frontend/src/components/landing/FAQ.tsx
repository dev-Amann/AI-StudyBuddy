import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FaqItem = ({ question, answer }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-5 text-left font-medium text-slate-900 hover:bg-slate-50 transition-colors"
            >
                {question}
                {isOpen ? <ChevronUp className="text-violet-500" /> : <ChevronDown className="text-slate-400" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-5 pt-0 text-slate-600 border-t border-slate-100">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-3xl px-4 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-4">
                    <FaqItem question="Is StudyBuddy really free?" answer="Yes! We offer a generous free tier that gives you access to all core features. Premium plans are available for power users." />
                    <FaqItem question="Can I upload scanned PDFs?" answer="Absolutely. Our OCR technology can read scanned documents and handwritten notes with high accuracy." />
                    <FaqItem question="How accurate is the AI?" answer="We use state-of-the-art language models (like Groq & Llama) to ensure high accuracy and relevance in all responses." />
                </div>
            </div>
        </section>
    );
};

export default FAQ;
