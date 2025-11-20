# Contributing to Bet Buddy

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
