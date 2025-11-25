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
exports.getMyOrders = exports.createOrder = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const { items, shippingDetails } = req.body;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // Calculate total
        let total = 0;
        for (const item of items) {
            const product = yield prisma.product.findUnique({ where: { id: item.productId } });
            if (product) {
                total += Number(product.price) * item.quantity;
            }
        }
        const order = yield prisma.order.create({
            data: {
                userId,
                total,
                status: 'PENDING',
                shippingName: shippingDetails.name,
                shippingAddress: shippingDetails.address,
                shippingCity: shippingDetails.city,
                shippingZip: shippingDetails.zip,
                shippingCountry: shippingDetails.country,
                items: {
                    create: items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price, // Should verify price from DB in real app
                    })),
                },
            },
            include: {
                items: true,
            },
        });
        res.status(201).json(order);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating order' });
    }
});
exports.createOrder = createOrder;
const getMyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const orders = yield prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching orders' });
    }
});
exports.getMyOrders = getMyOrders;
