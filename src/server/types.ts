// Routes
import { privateRoutes, publicRoutes } from "@/server";
// Types
import { CreatePrismaClient } from "@/server/db";

export type Variables = {
  prisma: CreatePrismaClient;
};

export type Env = {
  Variables: Variables;
};

export type AppType = typeof privateRoutes | typeof publicRoutes;
