# Contributing to Bet Buddy

Thank you for your interest in contributing to Bet Buddy! This document provides guidelines and standards for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Bet-Buddy-.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Submit a pull request

## Development Workflow

### Branching Strategy

- `main` - Stable production releases
- `dev` - Development branch for integrating features
- `feature/xyz` - Feature branches (one per feature)
- `fix/xyz` - Bug fix branches
- `hotfix/xyz` - Urgent production fixes

### Commit Messages

Follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat: add odds input to bet form
fix: correct win rate calculation
docs: update README with setup instructions
test: add unit tests for validators
```

## Coding Standards

### Naming Conventions

#### Components
- Use `PascalCase` for component names
- One component per file
- File name should match component name

```javascript
// BetEntryForm.js
export const BetEntryForm = ({ onSubmit }) => {
  // component code
}
```

#### Functions and Variables
- Use `camelCase` for function and variable names
- Use descriptive names

```javascript
const calculateWinRate = (wins, losses) => {
  return (wins / (wins + losses)) * 100
}
```

#### Files and Folders
- Use singular names unless storing multiple item types
- `src/components/` (plural because it contains multiple components)
- `BetEntryForm.js` (singular component name)

### Component Structure

```javascript
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

// Styled components
const Container = styled.View`
  // styles
`

// Component
export const ComponentName = ({ prop1, prop2 }) => {
  // Pure component logic
  return (
    <Container>
      {/* JSX */}
    </Container>
  )
}

// PropTypes
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.func.isRequired,
}
```

### Import Organization

Use absolute imports with the `src/` prefix:

```javascript
import { BetEntryForm } from 'src/components/BetEntryForm'
import { validateBetEntry } from 'src/utils/validators'
import { useAuth } from 'src/hooks/useAuth'
```

### State Management

- Use React hooks for local state
- Use custom hooks for shared business logic
- Use Context API only when passing state through >3 levels
- Keep side effects in hooks or service layer

### Error Handling

Always handle errors properly:

```javascript
const fetchData = async () => {
  try {
    const data = await apiCall()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error // Re-throw for UI handling
  }
}
```

### Styling

- Use `styled-components/native` for styling
- Follow dark mode design from theme
- Maintain WCAG AA accessibility compliance

```javascript
const Button = styled.TouchableOpacity`
  background: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md}px;
  border-radius: ${props => props.theme.borderRadius.md}px;
`
```

## Testing

### Unit Tests

Write unit tests for:
- All utility functions
- All custom hooks
- All service functions

```javascript
// validators.test.js
describe('validateEmail', () => {
  it('should validate correct email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true)
  })
  
  it('should reject invalid email addresses', () => {
    expect(validateEmail('invalid')).toBe(false)
  })
})
```

### Integration Tests

Write integration tests for:
- User authentication flows
- Bet entry and management flows
- Settings management

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## Code Quality

### Linting

Before committing, ensure your code passes linting:

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lint:fix
```

### Formatting

Format your code with Prettier:

```bash
npm run format
Thank you for your interest in contributing to Bet Buddy! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear, descriptive title
- Steps to reproduce the bug
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment (OS, device, app version)

### Suggesting Features

Feature requests are welcome! Please:
- Check existing issues first to avoid duplicates
- Provide clear use case and rationale
- Describe expected behavior
- Consider implementation complexity

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/ncsound919/Bet-Buddy-.git
   cd Bet-Buddy-
   ```

2. **Create a feature branch**
# Contributing to Overlay Odds

Thank you for your interest in contributing to Overlay Odds! This guide will help you get started.

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

3. **Make your changes**
   - Follow the coding standards below
   - Write clear commit messages
   - Add tests for new functionality
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm test
   npm run lint
   npm run type-check
   ```

5. **Commit your changes**
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

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide clear description of changes
   - Reference related issues
   - Include screenshots for UI changes

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid `any` type when possible
- Use meaningful variable names

### React/React Native

- Use functional components with hooks
- Follow React best practices
- Keep components focused and reusable
- Use proper prop types

### Styling

- Use React Native Paper components when possible
- Follow Material Design guidelines
- Use theme colors from `src/theme/theme.ts`
- Keep styles modular and maintainable

### Naming Conventions

- **Files**: PascalCase for components (`LoginScreen.tsx`), camelCase for utilities (`calculations.ts`)
- **Components**: PascalCase (`BetEntryForm`)
- **Functions**: camelCase (`calculateProfit`)
- **Constants**: UPPER_SNAKE_CASE (`FREE_TIER_LIMITS`)
- **Types/Interfaces**: PascalCase (`User`, `BetFormData`)

### Code Structure

```typescript
// Imports
import React from 'react';
import { View } from 'react-native';

// Types
interface Props {
  // ...
}

// Component
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState();
  
  // Handlers
  const handleAction = () => {
    // ...
  };
  
  // Render
  return (
    <View>
      {/* JSX */}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  // ...
});

// Export
export default MyComponent;
```

## Commit Message Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add bet slip OCR upload
fix: correct win rate calculation
docs: update setup instructions
style: format code with prettier
refactor: simplify insights service
test: add tests for bet calculations
chore: update dependencies
```

## Testing Guidelines

### Unit Tests

- Write tests for utility functions
- Test business logic thoroughly
- Use Jest and React Native Testing Library
- Aim for good coverage of critical paths

```typescript
describe('MyComponent', () => {
  it('should render correctly', () => {
    // Test implementation
  });
  
  it('should handle user interaction', () => {
    // Test implementation
  });
});
```

### Integration Tests

- Test complete user flows
- Verify screen navigation
- Test API interactions (mocked)

## Documentation

- Update README.md for user-facing changes
- Update SETUP.md for setup process changes
- Add JSDoc comments for complex functions
- Update type definitions

## Pull Request Review Process

1. Automated checks must pass (tests, linting)
2. Code review by maintainers
3. Address feedback and requested changes
4. Approval and merge by maintainer

## Development Setup

See [SETUP.md](SETUP.md) for complete development environment setup.

Quick start:
```bash
npm install
npm start
```

## Project Structure

Understanding the project structure helps in making contributions:

```
Bet-Buddy-/
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # Screen components
│   ├── services/        # Business logic & API
│   ├── models/          # TypeScript types
│   ├── navigation/      # Navigation configuration
│   ├── utils/           # Helper functions
│   ├── theme/           # Styling & theming
│   └── constants/       # App constants
├── functions/           # Firebase Cloud Functions
├── __tests__/           # Test files
└── assets/              # Static assets
```

## Areas Looking for Contributions

We especially welcome contributions in these areas:

1. **UI/UX Improvements**
   - Better animations and transitions
   - Accessibility improvements
   - Dark mode enhancements

2. **Features**
   - Advanced betting analytics
   - Social features
   - Integration with betting platforms

3. **Testing**
   - Increase test coverage
   - E2E tests
   - Performance tests

4. **Documentation**
   - Tutorials and guides
   - API documentation
   - Video walkthroughs

5. **Internationalization**
   - Multi-language support
   - Localization

## Questions?

If you have questions about contributing:
- Check existing documentation
- Search closed issues
- Open a new issue with your question
- Tag with `question` label

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

Thank you for contributing to Bet Buddy! 🎯
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

1. **Update your branch**: Rebase on latest `dev` branch
2. **Run tests**: Ensure all tests pass
3. **Run linting**: Fix all linting issues
4. **Update documentation**: If adding features, update README
5. **Create PR**: Submit PR against `dev` branch
6. **Description**: Provide clear description of changes
7. **Review**: Address reviewer feedback
8. **Merge**: Squash and merge after approval

### PR Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] Lint checks pass

## Security Guidelines

- **Never commit secrets**: Use `.env` for configuration
- **Validate all inputs**: Frontend and backend validation required
- **Sanitize user input**: Prevent XSS attacks
- **Use HTTPS**: For all API calls
- **Follow GDPR**: Ensure data deletion capabilities

## Database Guidelines

### Firestore Structure

```javascript
// Bet document
{
  userId: string,
  betType: string,
  teams: [string],
  odds: number,
  stake: number,
  result: string,
  payout: number,
  date: timestamp,
  notes: string
}
```

### Best Practices

- Index frequently queried fields
- Use security rules to protect data
- Batch operations when possible
- Handle offline scenarios

## Questions?

If you have questions, please:
1. Check existing documentation
2. Search closed issues
3. Open a new issue with the question label

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
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
