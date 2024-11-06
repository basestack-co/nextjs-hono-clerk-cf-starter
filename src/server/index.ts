import { Hono } from "hono";
// Utils
import { logger } from "hono/logger";
import { createMiddleware } from "hono/factory";
// Prisma
import { PrismaD1 } from "@prisma/adapter-d1";
import { createPrismaClient } from "@/server/db";
// Cloudflare
import { getRequestContext } from "@cloudflare/next-on-pages";
// Types
import { Env } from "@/server/types";
// Private Routes
import books from "./routes/books";

const app = new Hono<Env>().basePath("/api/v1");

const authMiddleware = createMiddleware<Env>(async (c, next) => {
  // c.set("message", "Hono is cool Yeah!!!!");

  await next();
});

const databaseMiddleware = createMiddleware<Env>(async (c, next) => {
  const adapter = new PrismaD1(getRequestContext().env.DB);
  const prisma = createPrismaClient(adapter);

  c.set("prisma", prisma);

  await next();
});

app.use(logger());

export const publicRoutes = app.get("/healthcheck", (c) => {
  return c.json("The API is running!");
});

export const privateRoutes = app
  .use(authMiddleware)
  .use(databaseMiddleware)
  .route("/books", books);

export default app;
