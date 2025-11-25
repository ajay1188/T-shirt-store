"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getAllOrders = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// GET /admin/orders - list all orders (admin only)
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield prisma.order.findMany({
            include: {
                user: { select: { name: true, email: true } },
                items: { include: { product: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching orders' });
    }
});
exports.getAllOrders = getAllOrders;
// PUT /admin/orders/:id - update order status (admin only)
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }
        const order = yield prisma.order.update({
            where: { id },
            data: { status },
        });
        res.json(order);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating order status' });
    }
});
exports.updateOrderStatus = updateOrderStatus;
