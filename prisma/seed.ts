import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function seed() {
  await prisma.users.createMany({
    data: [
      {
        id: '38ad1285-ad59-41e8-beb9-5c34a559cf91', // Replace with a UUID if required
        email: 'user1@example.com',
        name: 'User One',
        password:
          '$2b$10$fvg2Om5ORc86/uCy5NobVOBi48KoyWDu7h64e2kSnaFgGuSLp9xXK', // Remember to hash passwords in production
        createdAt: new Date(),
        age: 20,
        gender: 'FEMALE',
      },
      {
        id: 'aad5a5ce-60bb-4c51-b8b8-388dfe53bb03',
        email: 'user2@example.com',
        name: 'User Two',
        password:
          '$2b$10$fvg2Om5ORc86/uCy5NobVOBi48KoyWDu7h64e2kSnaFgGuSLp9xXK',
        createdAt: new Date(),
        age: 20,
        gender: 'MALE',
      },
      // Add more user objects as needed
    ],
  });
}

seed()
  .then(() => {
    console.log('Seeding successful!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
