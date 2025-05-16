import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Example user data
  await prisma.user.upsert({
    where: { email: 'example@example.com' },
    update: {},
    create: {
      id: '01890f3c-7f7b-7cd6-b6e7-8e8b7a1c0000', // Example UUID v7
      name: 'Example User',
      email: 'example@example.com',
      avatar: 'avatar.png',
      createdAt: new Date(),
    },
  });
  console.log('Seeded example user!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
