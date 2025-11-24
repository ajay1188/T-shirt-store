// Admin Order Management Routes
import { Router } from 'express';
import { getAllOrders, updateOrderStatus } from '../controllers/adminOrderController';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware';

const router = Router();

// GET all orders (admin only)
router.get('/', authenticateToken, isAdmin, getAllOrders);

// Update order status (admin only)
router.put('/:id', authenticateToken, isAdmin, updateOrderStatus);

export default router;
