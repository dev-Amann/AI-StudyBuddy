import React from 'react';
import { MessageSquare, Zap, Brain, Sparkles, Shield, Globe } from 'lucide-react';

const FeatureCard = ({ icon, title, description, color }: any) => {
    return (
        <div className="p-8 rounded-2xl bg-white border border-slate-100 hover:border-amber-200 transition-all hover:-translate-y-1 hover:shadow-xl group">
            <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-600 leading-relaxed">
                {description}
            </p>
        </div>
    );
};

const Features = () => {
    return (
        <section id="features" className="py-20 bg-white border-y border-slate-200">
            <div className="max-w-7xl px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                        Everything you need to <span className="text-amber-500">excel</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Stop struggling with manual notes. Let AI handle the heavy lifting while you focus on understanding.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<MessageSquare className="w-6 h-6" />}
                        title="24/7 AI Tutor"
                        description="Stuck on a problem at 2 AM? Our AI tutor is always awake to explain complex topics."
                        color="text-blue-600 bg-blue-50"
                    />
                    <FeatureCard
                        icon={<Zap className="w-6 h-6" />}
                        title="Instant PDF Summaries"
                        description="Turn 100-page textbooks into concise study guides in seconds."
                        color="text-amber-600 bg-amber-50"
                    />
                    <FeatureCard
                        icon={<Brain className="w-6 h-6" />}
                        title="Auto Flashcards"
                        description="Automatically generate flashcards from your notes for spaced repetition learning."
                        color="text-purple-600 bg-purple-50"
                    />
                    <FeatureCard
                        icon={<Sparkles className="w-6 h-6" />}
                        title="Smart Quizzes"
                        description="Test yourself with AI-generated quizzes that adapt to your knowledge gaps."
                        color="text-pink-600 bg-pink-50"
                    />
                    <FeatureCard
                        icon={<Shield className="w-6 h-6" />}
                        title="Private & Secure"
                        description="Your study materials are yours alone. Enterprise-grade encryption keeps them safe."
                        color="text-green-600 bg-green-50"
                    />
                    <FeatureCard
                        icon={<Globe className="w-6 h-6" />}
                        title="Study Anywhere"
                        description="Seamlessly sync across all your devices. Start on phone, finish on laptop."
                        color="text-cyan-600 bg-cyan-50"
                    />
                </div>
            </div>
        </section>
    );
};

export default Features;
