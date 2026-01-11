import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Brain } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-50/50 skew-x-12 transform origin-top-right z-0" />
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-white via-transparent to-transparent z-10" />

            <div className="grid max-w-7xl px-4 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 relative z-10">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            Fast & Accurate AI
                        </div>
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-slate-900">
                            Master Your Studies with <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-yellow-500">Intelligent AI</span>
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-slate-600 lg:mb-8 md:text-lg lg:text-xl">
                            Summarize PDFs, generate quizzes, and chat with your personal AI tutor. Join thousands of students boosting their grades with StudyBuddy.
                        </p>
                        <Link to="/dashboard" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-center text-white bg-amber-500 rounded-lg hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 transition-all hover:scale-105 shadow-lg shadow-amber-500/20">
                            Start Learning Free
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>

                        <div className="mt-8 flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center overflow-hidden bg-slate-100">
                                        <img src={`/avatars/avatar${i}.png`} alt={`User ${i}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <p>Loved by 10,000+ students worldwide</p>
                        </div>
                    </motion.div>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative w-full"
                    >
                        <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
                        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />

                        <div className="relative glass-panel p-6 rounded-2xl border border-white bg-white/60 backdrop-blur-xl shadow-2xl skew-y-1 transform hover:skew-y-0 transition-transform duration-500">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                    <div className="p-3 bg-amber-100 rounded-lg"><Sparkles className="w-6 h-6 text-amber-600" /></div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">Instant Summary</h4>
                                        <p className="text-xs text-slate-500">Processing Physics_Chapter_1.pdf...</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                    <div className="p-3 bg-yellow-100 rounded-lg"><Zap className="w-6 h-6 text-yellow-600" /></div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">Quiz Generated</h4>
                                        <p className="text-xs text-slate-500">10 Questions • Hard Diffculty</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                    <div className="p-3 bg-orange-100 rounded-lg"><Brain className="w-6 h-6 text-orange-600" /></div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">Concept Explained</h4>
                                        <p className="text-xs text-slate-500">Quantum Entanglement optimized</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
