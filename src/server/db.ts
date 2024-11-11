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
