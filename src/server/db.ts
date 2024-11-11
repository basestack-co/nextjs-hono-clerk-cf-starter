import { PrismaClient } from "@prisma/client";
// Types
import * as runtime from "@prisma/client/runtime/library";

export const createPrismaClient = (adapter?: runtime.DriverAdapter | null) =>
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

export type CreatePrismaClient = ReturnType<typeof createPrismaClient>;

/* import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; */
