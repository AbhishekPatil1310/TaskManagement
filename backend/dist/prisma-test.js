"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const prisma_1 = require("./config/prisma");
async function test() {
    const result = await prisma_1.prisma.$queryRaw `SELECT 1`;
    console.log(result);
    await prisma_1.prisma.$disconnect();
}
test();
