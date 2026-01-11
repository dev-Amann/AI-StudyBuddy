import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-32 pb-20 px-4">
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>

                    <div className="prose prose-slate max-w-none text-slate-600">
                        <p>Last updated: {new Date().toLocaleDateString()}</p>

                        <h3>1. Information We Collect</h3>
                        <p>
                            We collect information you provide directly to us when you create an account, use our AI study tools, or communicate with us.
                            This includes your name, email address, and any study materials you upload.
                        </p>

                        <h3>2. How We Use Your Information</h3>
                        <p>
                            We use the information we collect to provide, maintain, and improve our services, including generating AI summaries, quizzes, and flashcards based on your content.
                        </p>

                        <h3>3. Data Security</h3>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, destruction, or alteration.
                        </p>

                        <h3>4. Third-Party Services</h3>
                        <p>
                            We use third-party AI providers (like Groq) to process your data for the purpose of generating study materials. These providers adhere to strict data protection standards.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPage;
