# Bet-Buddy 🎲

Learn from your own bets - A comprehensive application for tracking and analyzing your betting activities.

## 🏗️ Project Structure

This is a full-stack application with the following structure:

```
Bet-Buddy-/
├── frontend/          # React + TypeScript + Vite frontend
├── backend/           # Node.js + Express + TypeScript backend
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Bet-Buddy-
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Development

#### Backend

```bash
cd backend
npm run dev        # Start development server with hot reload
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

The backend server will run on `http://localhost:3001`

#### Frontend

```bash
cd frontend
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

The frontend will run on `http://localhost:5173`

## 📁 Backend Structure

```
backend/
├── src/
│   ├── routes/        # API routes
│   ├── controllers/   # Request handlers
│   ├── models/        # Data models
│   ├── middleware/    # Express middleware
│   ├── config/        # Configuration files
│   ├── utils/         # Utility functions
│   └── server.ts      # Entry point
├── dist/              # Compiled JavaScript (generated)
└── package.json
```

## 📁 Frontend Structure

```
frontend/
├── src/
│   ├── components/    # React components
│   ├── assets/        # Static assets
│   ├── App.tsx        # Main App component
│   └── main.tsx       # Entry point
├── public/            # Public assets
└── package.json
```

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **ESLint** - Code linting

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **ESLint & Prettier** - Code quality

## 📝 License

MIT
