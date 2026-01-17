import { UserButton, useUser, useClerk } from '@clerk/clerk-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { BookOpen, Brain, FileText, FlaskConical, LayoutDashboard, MessageSquare, History, LogOut } from 'lucide-react'
import clsx from 'clsx'

const SidebarItem = ({ icon: Icon, label, to, active }: any) => (
    <Link
        to={to}
        className={clsx(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium",
            active
                ? "bg-rose-50 text-rose-900 border border-rose-200"
                : "text-slate-600 hover:bg-stone-50 hover:text-slate-900"
        )}
    >
        <Icon size={20} className={clsx("transition-transform group-hover:scale-110", active ? "text-rose-500" : "text-slate-400 group-hover:text-rose-500")} />
        <span>{label}</span>
    </Link>
)

export default function DashboardLayout() {
    const { user } = useUser()
    const { signOut } = useClerk()
    const location = useLocation()

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
        { icon: BookOpen, label: 'Explain Topic', to: '/dashboard/explain' },
        { icon: FileText, label: 'PDF Summarizer', to: '/dashboard/summarize' },
        { icon: FlaskConical, label: 'Quiz Generator', to: '/dashboard/quiz' },
        { icon: Brain, label: 'Flashcards', to: '/dashboard/flashcards' },
        { icon: MessageSquare, label: 'AI Tutor', to: '/dashboard/chat' },
    ]

    return (
        <div className="flex h-screen bg-stone-50 overflow-hidden selection:bg-rose-100 selection:text-rose-900">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-200 p-6 flex flex-col hidden md:flex z-20 shadow-sm">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="p-2 bg-gradient-to-br from-rose-400 to-red-500 rounded-lg shadow-lg shadow-red-500/20">
                        <Brain className="text-white" size={24} />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-red-500">
                        StudyBuddy
                    </span>
                </div>

                <nav className="space-y-2 flex-1 relative">
                    {navItems.map((item) => (
                        <SidebarItem
                            key={item.to}
                            {...item}
                            active={location.pathname === item.to}
                        />
                    ))}

                    <button
                        onClick={() => signOut({ redirectUrl: '/' })}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200 group mt-4 font-medium"
                    >
                        <LogOut size={20} className="transition-transform group-hover:scale-110 text-slate-400 group-hover:text-red-500" />
                        <span>Log Out</span>
                    </button>
                </nav>

                <div className="pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-slate-100">
                        <UserButton afterSignOutUrl="/sign-in" appearance={{
                            elements: {
                                avatarBox: "w-10 h-10"
                            }
                        }} />
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-semibold text-slate-700 truncate">{user?.fullName}</span>
                            <span className="text-xs text-slate-500 truncate">{user?.primaryEmailAddress?.emailAddress}</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 relative overflow-hidden flex flex-col">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-40">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-rose-200/20 blur-[100px]" />
                    <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-red-200/20 blur-[80px]" />
                </div>

                {/* Mobile Header */}
                <div className="md:hidden p-4 flex justify-between items-center bg-white/80 border-b border-slate-200 z-10 backdrop-blur-md">
                    <span className="font-bold text-slate-800 flex items-center gap-2">
                        <Brain className="text-rose-500" size={20} />
                        StudyBuddy
                    </span>
                    <UserButton />
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
