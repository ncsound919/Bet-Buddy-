# Accessibility Guidelines for Bet Buddy

## Overview
Bet Buddy is committed to ensuring our application is accessible to all users, including those with disabilities. This document outlines our accessibility standards and guidelines based on WCAG 2.1 Level AA compliance.

## Core Principles

### 1. Perceivable
- **Text Alternatives**: All non-text content has text alternatives (alt text for images, labels for form inputs)
- **Adaptable Content**: Content can be presented in different ways without losing information
- **Distinguishable**: Make it easy for users to see and hear content (sufficient color contrast, resizable text)

### 2. Operable
- **Keyboard Accessible**: All functionality is available via keyboard
- **Enough Time**: Users have adequate time to read and use content
- **Seizure Prevention**: No content flashes more than three times per second
- **Navigable**: Clear navigation mechanisms and skip links

### 3. Understandable
- **Readable**: Text content is readable and understandable
- **Predictable**: Web pages appear and operate in predictable ways
- **Input Assistance**: Help users avoid and correct mistakes

### 4. Robust
- **Compatible**: Content is compatible with current and future assistive technologies

## Implementation Standards

### HTML Structure
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- Proper heading hierarchy (h1-h6) without skipping levels
- Use `<button>` for buttons and `<a>` for links
- All forms have associated `<label>` elements

### ARIA (Accessible Rich Internet Applications)
- Use ARIA landmarks: `role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"`
- Use ARIA labels when visual labels aren't present: `aria-label`, `aria-labelledby`
- Use `aria-live` regions for dynamic content updates
- Use `aria-expanded`, `aria-hidden`, `aria-disabled` appropriately

### Color and Contrast
- Minimum contrast ratio of 4.5:1 for normal text
- Minimum contrast ratio of 3:1 for large text (18pt+)
- Don't rely on color alone to convey information
- Provide multiple indicators (color + icon, color + text)

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Visible focus indicators on all focusable elements
- Logical tab order (following visual layout)
- Keyboard shortcuts should not conflict with assistive technologies

### Forms
- All inputs have associated labels
- Required fields are clearly indicated
- Error messages are descriptive and associated with fields
- Success messages are announced to screen readers

### Images and Media
- All images have descriptive alt text
- Decorative images use `alt=""` or CSS backgrounds
- Videos have captions and transcripts
- Audio content has transcripts

### Responsive Design
- Text can be resized up to 200% without loss of functionality
- Layout adapts to different screen sizes
- Touch targets are at least 44x44 pixels

### Testing Requirements
- Test with keyboard only (no mouse)
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Test with browser zoom up to 200%
- Run automated accessibility checkers (axe, WAVE)
- Test with high contrast mode
- Test with color blindness simulators

## Tools and Resources

### Automated Testing
- **axe DevTools**: Browser extension for automated testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Built into Chrome DevTools
- **pa11y**: Command-line accessibility testing

### Screen Readers
- **NVDA**: Free Windows screen reader
- **JAWS**: Popular commercial screen reader
- **VoiceOver**: Built into macOS and iOS
- **TalkBack**: Built into Android

### Development Tools
- **eslint-plugin-jsx-a11y**: Linting for React accessibility
- **axe-core**: Automated accessibility testing library
- **color contrast analyzer**: Check color contrast ratios

## Continuous Improvement
- Regular accessibility audits
- User testing with people with disabilities
- Stay updated with WCAG guidelines
- Train development team on accessibility best practices

## Contact
For accessibility concerns or suggestions, please contact the development team.
