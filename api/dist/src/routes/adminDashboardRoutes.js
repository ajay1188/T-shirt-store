"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminDashboardController_1 = require("../controllers/adminDashboardController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.authenticateToken, authMiddleware_1.isAdmin, adminDashboardController_1.getDashboardStats);
exports.default = router;
