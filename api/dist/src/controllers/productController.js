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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductBySlug = exports.getProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, search } = req.query;
        const where = {};
        if (category) {
            where.category = { slug: String(category) };
        }
        if (search) {
            where.OR = [
                { name: { contains: String(search), mode: 'insensitive' } },
                { description: { contains: String(search), mode: 'insensitive' } },
            ];
        }
        const products = yield prisma.product.findMany({
            where,
            include: {
                category: true,
                variants: true,
            },
        });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});
exports.getProducts = getProducts;
const getProductBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const product = yield prisma.product.findUnique({
            where: { slug },
            include: {
                category: true,
                variants: true,
                reviews: {
                    include: { user: { select: { name: true } } }
                }
            },
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
});
exports.getProductBySlug = getProductBySlug;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, categoryId, images } = req.body;
        const slug = name.toLowerCase().replace(/ /g, '-');
        const product = yield prisma.product.create({
            data: {
                name,
                slug,
                description,
                price: parseFloat(price),
                categoryId,
                images: images || [],
            },
        });
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, price, categoryId, images } = req.body;
        const data = {};
        if (name) {
            data.name = name;
            data.slug = name.toLowerCase().replace(/ /g, '-');
        }
        if (description)
            data.description = description;
        if (price)
            data.price = parseFloat(price);
        if (categoryId)
            data.categoryId = categoryId;
        if (images)
            data.images = images;
        const product = yield prisma.product.update({
            where: { id },
            data,
        });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.product.delete({
            where: { id },
        });
        res.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
});
exports.deleteProduct = deleteProduct;
