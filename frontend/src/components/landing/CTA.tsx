import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="py-20">
            <div className="max-w-5xl mx-auto px-4">
                <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl p-10 md:p-16 text-center shadow-xl shadow-purple-500/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-white/10 pattern-dots"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to Ace Your Exams?</h2>
                        <p className="text-violet-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                            Join the community of top performers today. No credit card required.
                        </p>
                        <Link to="/sign-in" className="inline-block bg-white text-violet-600 font-bold text-lg px-10 py-4 rounded-xl hover:bg-slate-50 transform hover:scale-105 transition-all shadow-lg">
                            Get Started for Free
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;

