import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@frostedlane.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@frostedlane.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created');

  // Create categories and menu items
  const categories = [
    {
      name: 'Fruit Curls',
      description: 'Fresh fruits blended into creamy frozen curls for a refreshing dessert.',
      sortOrder: 1,
      items: [
        { name: 'Banana Curls', price: 120 },
        { name: 'Coconut Curls', price: 130 },
        { name: 'Mango Curls', price: 120, isPopular: true },
        { name: 'Pineapple Curls', price: 120 },
        { name: 'Sapota Curls', price: 130 },
        { name: 'Strawberry Curls', price: 130 },
        { name: 'Watermelon Curls', price: 130 },
      ],
    },
    {
      name: 'Biscuit Curls',
      description: 'Crispy biscuit flavors mixed into smooth frozen curls.',
      sortOrder: 2,
      items: [
        { name: 'Oreo Curls', price: 120, isPopular: true },
        { name: 'Biscoff Curls', price: 150, isPopular: true },
        { name: 'Bourbon Curls', price: 120 },
        { name: 'Vanilla Curls', price: 120 },
        { name: 'Chocolate Curls', price: 120 },
      ],
    },
    {
      name: 'Dry Fruit Curls',
      description: 'Premium dry fruit curls offering rich flavor and indulgence.',
      sortOrder: 3,
      items: [
        { name: 'Pista Curls', price: 190 },
        { name: 'Kaju Curls', price: 190 },
        { name: 'Mixed Curls', price: 200 },
      ],
    },
    {
      name: 'Custom Curls',
      description: 'Bring your own vegetarian ingredient and we\'ll transform it into delicious frozen curls.',
      sortOrder: 4,
      items: [
        { name: 'Custom Curls', price: 120 },
      ],
    },
    {
      name: 'Choco Fruits',
      description: 'Fresh fruits dipped in rich chocolate.',
      sortOrder: 5,
      items: [
        { name: 'Arctic Choco Banana', price: 80 },
        { name: 'Warm Choco Berry', price: 110 },
      ],
    },
    {
      name: 'Waffles',
      description: 'Crispy waffles served with customizable spreads.',
      sortOrder: 6,
      items: [
        { name: 'Vanilla Waffle', price: 120 },
        { name: 'Chocolate Waffle', price: 120 },
        { name: 'Red Velvet Waffle', price: 140, isPopular: true },
      ],
    },
    {
      name: 'Chill Sips',
      description: 'Cool and refreshing beverages to beat the heat.',
      sortOrder: 7,
      items: [
        { name: 'Chocolate Sip', price: 90 },
        { name: 'Mango Sip', price: 100 },
        { name: 'Rose Sip', price: 90 },
        { name: 'Banana Sip', price: 80 },
        { name: 'Pineapple Sip', price: 70 },
        { name: 'Sapota Sip', price: 80 },
        { name: 'Watermelon Sip', price: 70 },
      ],
    },
    {
      name: 'Hot Sips',
      description: 'Warm beverages to soothe your soul.',
      sortOrder: 8,
      items: [
        { name: 'Coffee', price: 35 },
        { name: 'Tea', price: 25 },
      ],
    },
  ];

  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { name: cat.name },
      update: {
        description: cat.description,
        sortOrder: cat.sortOrder,
      },
      create: {
        name: cat.name,
        description: cat.description,
        sortOrder: cat.sortOrder,
      },
    });

    for (const item of cat.items) {
      const existing = await prisma.menuItem.findFirst({
        where: { name: item.name, categoryId: category.id },
      });

      if (!existing) {
        await prisma.menuItem.create({
          data: {
            name: item.name,
            price: item.price,
            isPopular: item.isPopular || false,
            categoryId: category.id,
          },
        });
      }
    }

    console.log(`✅ Category "${cat.name}" seeded with ${cat.items.length} items`);
  }

  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
