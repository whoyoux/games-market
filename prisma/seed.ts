import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { faker } from "@faker-js/faker";
import { createArray } from 'dummy-array';

const main = async () => {
  const offers = await prisma.offer.createMany({
    data: createArray({to: 10}).map(() => {
      name
    })
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
