import React from 'react';
import { Brain } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="text-2xl font-bold flex items-center gap-2 text-slate-800">
                            <Brain className="w-6 h-6 text-amber-500" />
                            StudyBuddy
                        </span>
                        <p className="text-slate-500 mt-2 text-sm">Empowering students with AI.</p>
                    </div>
                    <div className="flex space-x-8">
                        <a href="/privacy" className="text-slate-500 hover:text-amber-600 transition-colors">Privacy Policy</a>
                        <a href="/terms" className="text-slate-500 hover:text-amber-600 transition-colors">Terms of Service</a>
                        <a href="/contact" className="text-slate-500 hover:text-amber-600 transition-colors">Contact</a>
                    </div>
                </div>
                <div className="mt-8 text-center text-slate-400 text-sm">
                    © {new Date().getFullYear()} StudyBuddy. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
