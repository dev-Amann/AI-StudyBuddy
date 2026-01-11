import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-32 pb-20 px-4">
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Terms of Service</h1>

                    <div className="prose prose-slate max-w-none text-slate-600">
                        <p>Last updated: {new Date().toLocaleDateString()}</p>

                        <h3>1. Acceptance of Terms</h3>
                        <p>
                            By accessing or using StudyBuddy, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                        </p>

                        <h3>2. Use of Service</h3>
                        <p>
                            StudyBuddy provides AI-powered study tools. You agree to use the service only for lawful educational purposes and in accordance with these terms.
                        </p>

                        <h3>3. Users Content</h3>
                        <p>
                            You retain ownership of any content you upload. By uploading content, you grant StudyBuddy a license to process it solely for the purpose of providing the service to you.
                        </p>

                        <h3>4. Disclaimer</h3>
                        <p>
                            The AI-generated content is provided "as is" without warranties of any kind. While we strive for accuracy, AI models may occasionally produce incorrect information. Always verify important information.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsPage;
