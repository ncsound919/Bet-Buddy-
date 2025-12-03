import { Router } from 'express';

const router = Router();

// Example route - to be implemented
router.get('/example', (_req, res) => {
  res.json({ message: 'Example route' });
});

export default router;
