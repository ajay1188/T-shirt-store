
import { Router } from 'express';
import { getDashboardStats } from '../controllers/adminDashboardController';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, isAdmin, getDashboardStats);

export default router;
