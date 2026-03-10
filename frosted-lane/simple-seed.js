const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Creating admin user manually...');

    const email = process.env.ADMIN_EMAIL || 'admin@frostedlane.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.upsert({
        where: { email },
        update: { password: hashedPassword },
        create: {
            email,
            password: hashedPassword,
            name: 'Admin',
            role: 'ADMIN',
        },
    });

    console.log('✅ Admin user created/updated:', user.email);
}

main()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
