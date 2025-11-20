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
