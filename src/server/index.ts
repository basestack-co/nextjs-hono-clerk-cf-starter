import { Hono } from "hono";
// Utils
import { logger } from "hono/logger";
import { createMiddleware } from "hono/factory";
// Prisma
import { PrismaD1 } from "@prisma/adapter-d1";
import { createPrismaClient } from "@/server/db";
// Cloudflare
import { getRequestContext } from "@cloudflare/next-on-pages";
// Auth
import { currentUser, auth } from "@clerk/nextjs/server";
// Types
import { Env } from "@/server/types";
// Private Routes
import todos from "./routes/todos";

const app = new Hono<Env>().basePath("/api/v1");

const AuthMiddleware = createMiddleware<Env>(async (c, next) => {
  const { userId } = await auth();

  if (!userId) {
    return c.json("Unauthorized", 401);
  }

  const user = await currentUser();

  if (!user) {
    return c.json("User not found", 404);
  }

  const adapter = new PrismaD1(getRequestContext().env.DB);
  const prisma = createPrismaClient(adapter);

  c.set("user", user);
  c.set("prisma", prisma);

  await next();
});

app.use(logger());

export const publicRoutes = app.get("/healthcheck", (c) => {
  return c.json("The API is running!");
});

export const privateRoutes = app.use(AuthMiddleware).route("/todos", todos);

export default app;
