import { Users, Linkedin, Instagram, Github } from 'lucide-react';

const Creators = () => {
    return (
        <section id="creators" className="py-20 bg-slate-50 relative">
            <div className="max-w-7xl px-4 mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-12">Meet the Creator</h2>

                <div className="max-w-md mx-auto relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-500 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform opacity-70 blur-lg"></div>
                    <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-slate-100 backdrop-blur-sm">
                        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-lg">
                            <Users className="w-16 h-16 text-violet-500" />
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900">Aman Singh</h3>
                        <p className="text-violet-600 font-medium mb-6">Founder & Developer</p>

                        <div className="flex justify-center flex-wrap gap-4">
                            <a
                                href="https://www.linkedin.com/in/aman-singh1/"
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 rounded-xl bg-slate-50 text-blue-600 hover:bg-blue-50 hover:scale-110 transition-all border border-slate-100 group/linkedin relative"
                            >
                                <Linkedin className="w-6 h-6" />
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover/linkedin:opacity-100 transition-opacity whitespace-nowrap">
                                    aman-singh1
                                </span>
                            </a>
                            <a
                                href="https://instagram.com/dr.kanekii"
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 rounded-xl bg-slate-50 text-pink-600 hover:bg-pink-50 hover:scale-110 transition-all border border-slate-100 group/insta relative"
                            >
                                <Instagram className="w-6 h-6" />
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover/insta:opacity-100 transition-opacity whitespace-nowrap">
                                    @dr.kanekii
                                </span>
                            </a>
                            <a
                                href="https://instagram.com/amman._11"
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 rounded-xl bg-slate-50 text-purple-600 hover:bg-purple-50 hover:scale-110 transition-all border border-slate-100 group/insta2 relative"
                            >
                                <Instagram className="w-6 h-6" />
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover/insta2:opacity-100 transition-opacity whitespace-nowrap">
                                    @amman._11
                                </span>
                            </a>
                            <a
                                href="https://github.com/dev-Amann"
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 rounded-xl bg-slate-50 text-slate-800 hover:bg-slate-100 hover:scale-110 transition-all border border-slate-100 group/github relative"
                            >
                                <Github className="w-6 h-6" />
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover/github:opacity-100 transition-opacity whitespace-nowrap">
                                    @dev-Amann
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Creators;
