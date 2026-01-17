import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-3">
                <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="p-2 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl shadow-lg shadow-purple-500/20">
                        <Brain className="w-6 h-6 text-white" />
                    </div>
                    <span className="self-center text-2xl font-bold whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-500">
                        StudyBuddy
                    </span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Link to="/dashboard">
                        <button type="button" className="text-white bg-gradient-to-r from-violet-500 to-purple-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all hover:shadow-lg hover:shadow-violet-500/30 active:scale-95">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

