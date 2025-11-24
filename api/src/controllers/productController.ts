import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { category, search } = req.query;

        const where: any = {};
        if (category) {
            where.category = { slug: String(category) };
        }
        if (search) {
            where.OR = [
                { name: { contains: String(search), mode: 'insensitive' } },
                { description: { contains: String(search), mode: 'insensitive' } },
            ];
        }

        const products = await prisma.product.findMany({
            where,
            include: {
                category: true,
                variants: true,
            },
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
};

export const getProductBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const product = await prisma.product.findUnique({
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
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
};
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, categoryId, images } = req.body;
        const slug = name.toLowerCase().replace(/ /g, '-');

        const product = await prisma.product.create({
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
    } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, price, categoryId, images } = req.body;

        const data: any = {};
        if (name) {
            data.name = name;
            data.slug = name.toLowerCase().replace(/ /g, '-');
        }
        if (description) data.description = description;
        if (price) data.price = parseFloat(price);
        if (categoryId) data.categoryId = categoryId;
        if (images) data.images = images;

        const product = await prisma.product.update({
            where: { id },
            data,
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({
            where: { id },
        });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
};
