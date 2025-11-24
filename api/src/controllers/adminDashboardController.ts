
import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
    try {
        const totalOrders = await prisma.order.count();
        const totalProducts = await prisma.product.count();

        const orders = await prisma.order.findMany({
            select: { total: true }
        });

        const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0);

        res.json({
            totalOrders,
            totalProducts,
            totalRevenue
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ error: 'Error fetching dashboard stats' });
    }
};
