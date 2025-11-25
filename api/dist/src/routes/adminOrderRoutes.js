"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Admin Order Management Routes
const express_1 = require("express");
const adminOrderController_1 = require("../controllers/adminOrderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// GET all orders (admin only)
router.get('/', authMiddleware_1.authenticateToken, authMiddleware_1.isAdmin, adminOrderController_1.getAllOrders);
// Update order status (admin only)
router.put('/:id', authMiddleware_1.authenticateToken, authMiddleware_1.isAdmin, adminOrderController_1.updateOrderStatus);
exports.default = router;
