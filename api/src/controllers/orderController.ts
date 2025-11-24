import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export const createOrder = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { items, shippingDetails } = req.body;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Calculate total
        let total = 0;
        for (const item of items) {
            const product = await prisma.product.findUnique({ where: { id: item.productId } });
            if (product) {
                total += Number(product.price) * item.quantity;
            }
        }

        const order = await prisma.order.create({
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
                    create: items.map((item: any) => ({
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating order' });
    }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const orders = await prisma.order.findMany({
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
    } catch (error) {
        res.status(500).json({ error: 'Error fetching orders' });
    }
};
