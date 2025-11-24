import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching categories' });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const slug = name.toLowerCase().replace(/ /g, '-');
        const category = await prisma.category.create({
            data: { name, slug },
        });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error creating category' });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const slug = name.toLowerCase().replace(/ /g, '-');
        const category = await prisma.category.update({
            where: { id },
            data: { name, slug },
        });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error updating category' });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.category.delete({
            where: { id },
        });
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category' });
    }
};
