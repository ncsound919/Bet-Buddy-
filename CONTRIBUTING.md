# Contributing to Bet-Buddy

Thank you for your interest in contributing to Bet-Buddy! This guide will help you get started.

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Bet-Buddy-.git
   cd Bet-Buddy-
   ```

2. **Install Dependencies**
   ```bash
   # Install all dependencies
   npm run install:all
   
   # Or install individually
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Set Up Environment Variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

## Development Workflow

### Running the Application

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

### Making Changes

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow the existing code style
   - Write clear, descriptive commit messages
   - Keep changes focused and atomic

3. **Test Your Changes**
   ```bash
   # Build both projects
   npm run build:all
   
   # Run linters
   npm run lint:all
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

## Code Style Guidelines

### Backend (TypeScript)

- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for formatting
- Write clear function and variable names
- Add comments for complex logic

### Frontend (React + TypeScript)

- Use functional components with hooks
- Follow React best practices
- Type all props and state
- Keep components small and focused
- Use meaningful component names

## Commit Message Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add bet history tracking
fix: resolve calculation error in win rate
docs: update API documentation
```

## Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Make sure linting passes
4. Create a Pull Request with a clear description
5. Wait for code review
6. Address any feedback

## Project Structure

### Backend Structure
```
backend/src/
├── routes/        # API route definitions
├── controllers/   # Request handlers
├── models/        # Data models
├── middleware/    # Express middleware
├── config/        # Configuration
└── utils/         # Utility functions
```

### Frontend Structure
```
frontend/src/
├── components/    # React components
├── assets/        # Static assets
├── App.tsx        # Main app component
└── main.tsx       # Entry point
```

## Need Help?

- Check the README.md for setup instructions
- Review existing code for examples
- Open an issue for questions or bugs

Thank you for contributing! 🎉
