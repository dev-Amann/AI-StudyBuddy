import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, SkipForward, Timer, Coffee, Brain, CheckCircle } from 'lucide-react'
import clsx from 'clsx'

type TimerMode = 'work' | 'shortBreak' | 'longBreak'

const TIMER_SETTINGS = {
    work: { duration: 25 * 60, label: 'Focus Time', icon: Brain, color: 'rose' },
    shortBreak: { duration: 5 * 60, label: 'Short Break', icon: Coffee, color: 'emerald' },
    longBreak: { duration: 15 * 60, label: 'Long Break', icon: Coffee, color: 'sky' },
}

export default function PomodoroPage() {
    const [mode, setMode] = useState<TimerMode>('work')
    const [timeLeft, setTimeLeft] = useState(TIMER_SETTINGS.work.duration)
    const [isRunning, setIsRunning] = useState(false)
    const [completedPomodoros, setCompletedPomodoros] = useState(0)

    const currentSettings = TIMER_SETTINGS[mode]

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const resetTimer = useCallback(() => {
        setTimeLeft(TIMER_SETTINGS[mode].duration)
        setIsRunning(false)
    }, [mode])

    const switchMode = (newMode: TimerMode) => {
        setMode(newMode)
        setTimeLeft(TIMER_SETTINGS[newMode].duration)
        setIsRunning(false)
    }

    const skipToNext = () => {
        if (mode === 'work') {
            const nextBreak = (completedPomodoros + 1) % 4 === 0 ? 'longBreak' : 'shortBreak'
            setCompletedPomodoros(prev => prev + 1)
            switchMode(nextBreak)
        } else {
            switchMode('work')
        }
    }

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            // Timer completed
            setIsRunning(false)
            // Play notification sound (optional)
            try {
                const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleR0ILIHl9vCpkXktCB5z...')
                audio.play().catch(() => { })
            } catch { }
            // Auto skip to next
            skipToNext()
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isRunning, timeLeft])

    const progress = ((TIMER_SETTINGS[mode].duration - timeLeft) / TIMER_SETTINGS[mode].duration) * 100

    const getColorClasses = () => {
        switch (mode) {
            case 'work':
                return {
                    bg: 'bg-violet-500',
                    bgLight: 'bg-violet-100',
                    text: 'text-violet-600',
                    border: 'border-violet-200',
                    ring: 'ring-violet-500/20',
                    gradient: 'from-violet-500 to-purple-500',
                }
            case 'shortBreak':
                return {
                    bg: 'bg-emerald-500',
                    bgLight: 'bg-emerald-100',
                    text: 'text-emerald-600',
                    border: 'border-emerald-200',
                    ring: 'ring-emerald-500/20',
                    gradient: 'from-emerald-500 to-teal-500',
                }
            case 'longBreak':
                return {
                    bg: 'bg-sky-500',
                    bgLight: 'bg-sky-100',
                    text: 'text-sky-600',
                    border: 'border-sky-200',
                    ring: 'ring-sky-500/20',
                    gradient: 'from-sky-500 to-blue-500',
                }
        }
    }

    const colors = getColorClasses()
    const IconComponent = currentSettings.icon

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <div className={clsx("inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4", colors.bgLight, colors.text)}>
                    <Timer size={18} />
                    <span className="font-semibold">Pomodoro Timer</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Stay Focused, Stay Productive</h1>
                <p className="text-slate-500">Use the Pomodoro Technique to manage your study sessions effectively.</p>
            </div>

            {/* Mode Selector */}
            <div className="flex justify-center gap-2 mb-8">
                {(Object.keys(TIMER_SETTINGS) as TimerMode[]).map((m) => (
                    <button
                        key={m}
                        onClick={() => switchMode(m)}
                        className={clsx(
                            "px-4 py-2 rounded-lg font-medium transition-all",
                            mode === m
                                ? `${colors.bg} text-white shadow-lg`
                                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                        )}
                    >
                        {TIMER_SETTINGS[m].label}
                    </button>
                ))}
            </div>

            {/* Timer Display */}
            <motion.div
                key={mode}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mb-8"
            >
                <div className="flex flex-col items-center">
                    {/* Circular Progress */}
                    <div className="relative w-64 h-64 mb-6">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="128"
                                cy="128"
                                r="120"
                                fill="none"
                                stroke="#e2e8f0"
                                strokeWidth="8"
                            />
                            <circle
                                cx="128"
                                cy="128"
                                r="120"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={2 * Math.PI * 120}
                                strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                                className={colors.text}
                                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <IconComponent size={32} className={colors.text} />
                            <span className="text-5xl font-bold text-slate-800 mt-2">{formatTime(timeLeft)}</span>
                            <span className={clsx("text-sm font-medium mt-1", colors.text)}>{currentSettings.label}</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={resetTimer}
                            className="p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
                            title="Reset"
                        >
                            <RotateCcw size={24} />
                        </button>

                        <button
                            onClick={() => setIsRunning(!isRunning)}
                            className={clsx(
                                "p-5 rounded-2xl text-white shadow-lg transition-all transform hover:scale-105 active:scale-95",
                                `bg-gradient-to-r ${colors.gradient}`
                            )}
                            title={isRunning ? 'Pause' : 'Start'}
                        >
                            {isRunning ? <Pause size={32} /> : <Play size={32} />}
                        </button>

                        <button
                            onClick={skipToNext}
                            className="p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
                            title="Skip"
                        >
                            <SkipForward size={24} />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Completed Pomodoros */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle size={20} className="text-violet-500" />
                    <span className="font-semibold text-slate-700">Completed Today</span>
                </div>
                <div className="flex justify-center gap-2 flex-wrap">
                    {Array.from({ length: Math.min(completedPomodoros, 12) }).map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center">
                            <CheckCircle size={14} className="text-white" />
                        </div>
                    ))}
                    {completedPomodoros === 0 && (
                        <span className="text-slate-400 text-sm">No pomodoros completed yet. Start focusing!</span>
                    )}
                    {completedPomodoros > 12 && (
                        <span className="text-violet-600 font-bold">+{completedPomodoros - 12}</span>
                    )}
                </div>
            </div>
        </div>
    )
}
