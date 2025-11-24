import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import categoryRoutes from './routes/categoryRoutes';
import adminOrderRoutes from './routes/adminOrderRoutes';
import adminDashboardRoutes from './routes/adminDashboardRoutes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
console.log('✓ Auth routes registered');
app.use('/products', productRoutes);
console.log('✓ Product routes registered');
app.use('/orders', orderRoutes);
console.log('✓ Order routes registered');
app.use('/categories', categoryRoutes);
console.log('✓ Category routes registered');
app.use('/admin/orders', adminOrderRoutes);
console.log('✓ Admin order routes registered');
app.use('/admin/dashboard', adminDashboardRoutes);
console.log('✓ Admin dashboard routes registered');

app.get('/', (req, res) => {
    res.send('LOOMSPACE API is running');
});

// Health check
app.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: 'ok', database: 'connected' });
    } catch (error) {
        res.status(500).json({ status: 'error', database: 'disconnected', error: String(error) });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export for Vercel serverless
export default app;
