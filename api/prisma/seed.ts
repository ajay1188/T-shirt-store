import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    const passwordHash = await bcrypt.hash('password123', 10);

    // Create Admin User
    const adminEmail = 'admin@loomspace.com';
    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            password: passwordHash,
        },
        create: {
            email: adminEmail,
            name: 'Admin User',
            password: passwordHash,
            role: Role.ADMIN,
        },
    });

    // Create Customer User
    const userEmail = 'user@loomspace.com';
    const user = await prisma.user.upsert({
        where: { email: userEmail },
        update: {
            password: passwordHash,
        },
        create: {
            email: userEmail,
            name: 'Demo User',
            password: passwordHash,
            role: Role.CUSTOMER,
        },
    });

    // Create Categories
    const categories = ['Men', 'Women', 'Oversized', 'Printed', 'Plain'];
    const categoryMap: Record<string, string> = {};

    for (const cat of categories) {
        const c = await prisma.category.upsert({
            where: { name: cat },
            update: {},
            create: {
                name: cat,
                slug: cat.toLowerCase(),
            },
        });
        categoryMap[cat] = c.id;
    }

    // Create Products
    const products = [
        {
            name: 'Classic White Tee',
            description: 'A timeless classic. 100% Cotton.',
            price: 29.99,
            category: 'Men',
            images: ['https://placehold.co/600x400/white/black?text=Classic+White+Tee'],
        },
        {
            name: 'Midnight Black Oversized',
            description: 'Streetwear essential. Heavyweight cotton.',
            price: 39.99,
            category: 'Oversized',
            images: ['https://placehold.co/600x400/black/white?text=Midnight+Black'],
        },
        {
            name: 'Vintage Wash Grey',
            description: 'Soft, lived-in feel. Vintage wash.',
            price: 34.99,
            category: 'Men',
            images: ['https://placehold.co/600x400/grey/white?text=Vintage+Wash'],
        },
        {
            name: 'Summer Floral Print',
            description: 'Vibrant floral print for summer vibes.',
            price: 45.00,
            category: 'Printed',
            images: ['https://placehold.co/600x400/orange/white?text=Floral+Print'],
        },
        {
            name: 'Basic Blue Crew',
            description: 'Everyday essential. Breathable fabric.',
            price: 25.00,
            category: 'Plain',
            images: ['https://placehold.co/600x400/blue/white?text=Basic+Blue'],
        },
        {
            name: 'Olive Green Boxy',
            description: 'Boxy fit for a modern silhouette.',
            price: 32.00,
            category: 'Women',
            images: ['https://placehold.co/600x400/olive/white?text=Olive+Green'],
        },
        {
            name: 'Striped Sailor Tee',
            description: 'Nautical stripes. 100% Organic Cotton.',
            price: 38.00,
            category: 'Women',
            images: ['https://placehold.co/600x400/white/blue?text=Striped+Sailor'],
        },
        {
            name: 'Graphic Art Tee',
            description: 'Limited edition graphic print.',
            price: 49.99,
            category: 'Printed',
            images: ['https://placehold.co/600x400/purple/white?text=Graphic+Art'],
        },
        {
            name: 'Beige Lounge Tee',
            description: 'Perfect for lounging. Ultra soft.',
            price: 28.00,
            category: 'Plain',
            images: ['https://placehold.co/600x400/beige/black?text=Beige+Lounge'],
        },
        {
            name: 'Charcoal Heavyweight',
            description: 'Durable and stylish. 280gsm.',
            price: 42.00,
            category: 'Oversized',
            images: ['https://placehold.co/600x400/333333/white?text=Charcoal+Heavy'],
        },
    ];

    for (const p of products) {
        const product = await prisma.product.create({
            data: {
                name: p.name,
                slug: p.name.toLowerCase().replace(/ /g, '-'),
                description: p.description,
                price: p.price,
                categoryId: categoryMap[p.category],
                images: p.images,
            },
        });

        // Create Variants
        const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
        for (const size of sizes) {
            await prisma.variant.create({
                data: {
                    productId: product.id,
                    size: size,
                    color: 'Default', // Simplified for now
                    stock: Math.floor(Math.random() * 50),
                },
            });
        }
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
