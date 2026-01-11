import { Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn, useAuth } from '@clerk/clerk-react'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import ExplainPage from './pages/ExplainPage'
import SummarizePage from './pages/SummarizePage'
import QuizPage from './pages/QuizPage'
import FlashcardsPage from './pages/FlashcardsPage'
import ChatPage from './pages/ChatPage'
import LandingPage from './pages/LandingPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import ContactPage from './pages/ContactPage'

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <SignedIn>{children}</SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    )
}

// Redirect authenticated users away from public pages
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { isSignedIn } = useAuth();
    if (isSignedIn) {
        return <Navigate to="/dashboard" replace />;
    }
    return <>{children}</>;
}

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
            <Route path="/privacy" element={<PublicRoute><PrivacyPage /></PublicRoute>} />
            <Route path="/terms" element={<PublicRoute><TermsPage /></PublicRoute>} />
            <Route path="/contact" element={<PublicRoute><ContactPage /></PublicRoute>} />
            <Route path="/sign-in/*" element={<RedirectToSignIn />} />

            {/* Protected Routes - Moved to /dashboard */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="explain" element={<ExplainPage />} />
                <Route path="summarize" element={<SummarizePage />} />
                <Route path="quiz" element={<QuizPage />} />
                <Route path="flashcards" element={<FlashcardsPage />} />
                <Route path="chat" element={<ChatPage />} />
            </Route>

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default App
