import "dotenv/config";
import { prisma } from "./config/prisma";

async function test() {
  const result = await prisma.$queryRaw`SELECT 1`;
  console.log(result);
  await prisma.$disconnect();
}

test();
