import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import toolsRouter from './routes/tools';
import ocrRouter from './routes/ocr';
import gamesRouter from './routes/games';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.get('/api', (_req: Request, res: Response) => {
  res.json({ 
    message: 'Bet Buddy API is running',
    version: '2.0.0',
    features: [
      'Odds Calculator',
      'Statistics Engine',
      'Data Validator',
      'Data Exporter',
      'Screenshot OCR',
      'Sports Games',
      'SimVC Currency',
      'API Integrations'
    ]
  });
  res.json({ message: 'Overlay Odds API is running' });
});

// Tools API routes
app.use('/api/tools', toolsRouter);

// OCR API routes
app.use('/api/ocr', ocrRouter);

// Games and SimVC API routes
app.use('/api/games', gamesRouter);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
