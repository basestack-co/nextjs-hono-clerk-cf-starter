// Routes
import { privateRoutes, publicRoutes } from "@/server";
// Types
import { CreatePrismaClient } from "@/server/db";
import { User } from "@clerk/nextjs/server";

export type Variables = {
  prisma: CreatePrismaClient;
  user: User;
};

export type Env = {
  Variables: Variables;
};

export type AppType = typeof privateRoutes | typeof publicRoutes;
