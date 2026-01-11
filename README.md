# 🧠 StudyBuddy - AI-Powered Learning Assistant

![Status](https://img.shields.io/badge/Status-Development-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Python](https://img.shields.io/badge/Backend-FastAPI-009688)
![React](https://img.shields.io/badge/Frontend-React_19-61DAFB)

**StudyBuddy** is a comprehensive AI-powered educational platform designed to enhance the learning experience. By leveraging the power of **Groq's LLaMA 3** models, it offers real-time tutoring, content summarization, quiz generation, and flashcard creation, all wrapped in a modern, responsive interface.

---

## ✨ Key Features

- **🤖 AI Tutor Chat**: Engage in natural, context-aware conversations with an AI study companion.
- **📚 Topic Simplifier**: Break down complex subjects into easy-to-understand explanations.
- **📝 PDF & Text Summarizer**: Instantly extract key insights from documents and long texts.
- **🎯 Smart Quiz Generator**: Create custom quizzes on any topic to test your knowledge.
- **🗂️ Flashcard Creator**: Automatically meaningful flashcards for active recall study.
- **🔐 Secure Authentication**: Integrated with **Clerk** for robust user management.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Deployment**: Vercel (Static Site)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Lucide React](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/)
- **State/Auth**: [Clerk](https://clerk.com/), Context API
- **HTTP Client**: Axios

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.8+)
- **Deployment**: Vercel Serverless Functions (`api/` directory)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) (via **Motor** async driver)
- **AI Engine**: [Groq API](https://groq.com/) (LLaMA 3 8B/70B)
- **Validation**: Pydantic v2

---

## 🏗️ Architecture

```mermaid
graph TD
    User[User] -->|HTTPS| Vercel[Vercel Edge Network]
    Vercel -->|Static Assets| Frontend[React Frontend]
    Vercel -->|/api/* Rewrites| Serverless[FastAPI Serverless Function]
    
    subgraph "Serverless Backend"
        Serverless -->|Auth Check| Clerk[Clerk Auth]
        Serverless -->|Data| DB[(MongoDB Atlas)]
        Serverless -->|AI Inference| Groq[Groq API]
    end
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- **Node.js** (v18+) & **npm**
- **Python** (v3.10+)
- **MongoDB Atlas** Account (for connection string)
- **Groq Cloud** API Key
- **Clerk** Account (Publishable Key & Issuer URL)

### 1. Backend Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd StudyBuddy
    ```

2.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

3.  **Create and activate a virtual environment**:
    ```bash
    python -m venv venv
    
    # Windows
    .\venv\Scripts\activate
    
    # macOS/Linux
    source venv/bin/activate
    ```

4.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

5.  **Configure Environment Variables**:
    Create a `.env` file in the `backend/` directory:
    ```env
    MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
    GROQ_API_KEY=gsk_...
    CLERK_ISSUER_URL=https://<your-clerk-domain>.clerk.accounts.dev
    ```

6.  **Run the Server**:
    ```bash
    uvicorn app.main:app --reload
    ```
    *The backend will start at `http://127.0.0.1:8000`. Note: Local dev still uses the standard FastAPI app.*

### 2. Frontend Setup

1.  **Open a new terminal and navigate to the frontend**:
    ```bash
    cd frontend
    ```

2.  **Install npm dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env.local` file in the `frontend/` directory:
    ```env
    VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
    # Connects to local proxy or Vercel rewrite
    VITE_API_URL=/api
    ```

4.  **Start the Development Server**:
    ```bash
    npm run dev
    ```
    *The app will launch at `http://localhost:5173`. API requests to `/api` are proxied to `http://localhost:8000`.*

---

## ☁️ Deployment (Vercel)

This project is configured for **Zero-Config Vercel Deployment**.

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  **Environment Variables**: Add your backend environment variables (`MONGODB_URI`, `GROQ_API_KEY`, `CLERK_ISSUER_URL`) to the Vercel project settings.
4.  Deploy! 
    - Vercel automatically detects the `api` folder and deploys it as a Python Serverless Function.
    - `vercel.json` handles the build command and API routing.

---

## 📖 Usage Guide

1.  **Sign Up/Login**: Create an account using the Clerk-powered authentication page.
2.  **Dashboard**: Access the main hub to navigate between tools.
3.  **AI Tutor**: Click "AI Tutor" to start a chat session. Your history is saved automatically.
4.  **Generators**: Use the "Quiz" or "Flashcards" tools to generate study materials from raw text or topics.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
