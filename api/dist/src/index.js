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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const adminOrderRoutes_1 = __importDefault(require("./routes/adminOrderRoutes"));
const adminDashboardRoutes_1 = __importDefault(require("./routes/adminDashboardRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/auth', authRoutes_1.default);
console.log('✓ Auth routes registered');
app.use('/products', productRoutes_1.default);
console.log('✓ Product routes registered');
app.use('/orders', orderRoutes_1.default);
console.log('✓ Order routes registered');
app.use('/categories', categoryRoutes_1.default);
console.log('✓ Category routes registered');
app.use('/admin/orders', adminOrderRoutes_1.default);
console.log('✓ Admin order routes registered');
app.use('/admin/dashboard', adminDashboardRoutes_1.default);
console.log('✓ Admin dashboard routes registered');
app.get('/', (req, res) => {
    res.send('LOOMSPACE API is running');
});
// Health check
app.get('/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$queryRaw `SELECT 1`;
        res.json({ status: 'ok', database: 'connected' });
    }
    catch (error) {
        res.status(500).json({ status: 'error', database: 'disconnected', error: String(error) });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// Export for Vercel serverless
exports.default = app;
