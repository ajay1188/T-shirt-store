import { Router } from 'express';
import { createOrder, getMyOrders } from '../controllers/orderController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateToken, createOrder);
router.get('/my-orders', authenticateToken, getMyOrders);

export default router;
