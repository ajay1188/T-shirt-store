import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdminUser() {
    try {
        // Get user input for credentials
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const question = (query: string): Promise<string> => {
            return new Promise((resolve) => {
                readline.question(query, resolve);
            });
        };

        console.log('\n🔐 Create Your Admin Account\n');
        console.log('Enter your details below:\n');

        const name = await question('Full Name: ');
        const email = await question('Email: ');
        const password = await question('Password: ');

        readline.close();

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            console.log('\n❌ Error: A user with this email already exists!');
            console.log(`   Email: ${email}`);
            console.log('\nPlease use a different email or delete the existing user first.');
            process.exit(1);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the admin user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'ADMIN'
            }
        });

        console.log('\n✅ Admin account created successfully!\n');
        console.log('Your credentials:');
        console.log(`   Name: ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log('\nYou can now log in to the admin panel at http://localhost:5173/');

    } catch (error) {
        console.error('\n❌ Error creating admin user:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

createAdminUser();
