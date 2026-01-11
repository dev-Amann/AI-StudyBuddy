import React, { useState } from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { Mail, MessageSquare, Send } from 'lucide-react';

const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Simulate form submission
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-32 pb-20 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Get in Touch [Currently Out of Service]</h1>
                        <p className="text-slate-600 text-lg">Have questions or feedback? We'd love to hear from you.</p>
                    </div>

                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                                <p className="text-slate-600">Thanks for reaching out. We'll get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <Mail className="w-5 h-5" />
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="mt-12 grid md:grid-cols-2 gap-6 text-center">
                        <div className="p-6 bg-white rounded-2xl border border-slate-100">
                            <Mail className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                            <h3 className="font-bold text-slate-900">Email Us</h3>
                            <p className="text-slate-500">support@abc.com</p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-slate-100">
                            <MessageSquare className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                            <h3 className="font-bold text-slate-900">Live Chat</h3>
                            <p className="text-slate-500">Available Mon-Fri, 9am-5pm</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;
