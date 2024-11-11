// Routes
import { privateRoutes, publicRoutes } from "@/server";
// Types
import { CreatePrismaClient } from "@/server/db";
import { Session } from "next-auth";

export type Variables = {
  prisma: CreatePrismaClient;
  session: Session;
};

export type Env = {
  Variables: Variables;
};

export type AppType = typeof privateRoutes | typeof publicRoutes;
