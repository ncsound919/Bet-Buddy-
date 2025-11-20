# Bet Buddy Backend API

## Overview

This is the backend API for Bet Buddy, built with Node.js, Express, and TypeScript.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and configure your environment variables:

```bash
cp .env.example .env
```

### Development

```bash
npm run dev
```

The server will start on `http://localhost:3001` with hot reload enabled.

### Build

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist` folder.

### Production

```bash
npm run start
```

### Code Quality

```bash
npm run lint      # Run ESLint
npm run format    # Format code with Prettier
```

## API Endpoints

### Health Check

- `GET /health` - Returns server health status

### API

- `GET /api` - Returns API information

## Project Structure

```
src/
├── routes/        # API route definitions
├── controllers/   # Request handlers and business logic
├── models/        # Data models and schemas
├── middleware/    # Custom Express middleware
├── config/        # Configuration files
├── utils/         # Utility functions and helpers
└── server.ts      # Application entry point
```

## Adding New Features

1. **Create a route** in `src/routes/`
2. **Create a controller** in `src/controllers/`
3. **Define models** in `src/models/` (if needed)
4. **Add middleware** in `src/middleware/` (if needed)
5. **Import and use** the route in `server.ts`
