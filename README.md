# Bet Buddy

Learn from your own bets - An accessible betting tracking application

## Overview

Bet Buddy helps you track, analyze, and learn from your betting history. Built with accessibility as a core principle, our application ensures everyone can benefit from data-driven betting insights.

## Accessibility Features

We are committed to making Bet Buddy accessible to all users, including those with disabilities. Our application follows WCAG 2.1 Level AA standards.

### Key Accessibility Features:

- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **High Contrast Mode**: Supports high contrast and dark mode preferences
- **Reduced Motion**: Respects user's motion preferences
- **Color Contrast**: All text meets WCAG AA contrast ratios (4.5:1 for normal text)
- **Responsive Design**: Works on all screen sizes and devices
- **Touch Targets**: All interactive elements are at least 44x44 pixels
- **Skip Links**: Quick navigation for keyboard users
- **Form Accessibility**: All inputs have labels, error messages, and help text
- **ARIA Live Regions**: Dynamic content updates announced to screen readers

### Testing

We use automated accessibility testing tools to ensure compliance:

```bash
# Install dependencies
npm install

# Run accessibility tests
npm run test:a11y

# Run ESLint with accessibility rules
npm run lint
```

### Supported Assistive Technologies:

- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)
- ZoomText
- Dragon NaturallySpeaking

## Getting Started

1. Open `index.html` in your web browser
2. Use the form to add your bets
3. View your statistics and betting history
4. Learn from your patterns and improve your decisions

## Documentation

For detailed accessibility guidelines and implementation details, see [ACCESSIBILITY.md](ACCESSIBILITY.md)

## Contributing

When contributing to Bet Buddy, please ensure all changes maintain or improve accessibility:

1. Test with keyboard navigation only
2. Test with a screen reader
3. Run automated accessibility tests
4. Check color contrast ratios
5. Test with browser zoom at 200%

## License

MIT
