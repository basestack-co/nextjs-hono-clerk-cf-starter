import { Hono } from "hono";
// Utils
import { logger } from "hono/logger";
import { createMiddleware } from "hono/factory";
// Types
import { Env } from "@/server/types";
// Private Routes
import authors from "./routes/authors";
import books from "./routes/books";

const app = new Hono<Env>().basePath("/api/v1");

const authMiddleware = createMiddleware<Env>(async (c, next) => {
  c.set("message", "Hono is cool Yeah!!!!");
  await next();
});

app.use(logger());

export const publicRoutes = app.get("/healthcheck", (c) => {
  return c.json("The API is running!");
});

export const privateRoutes = app
  .use(authMiddleware)
  .route("/authors", authors)
  .route("/books", books);

export default app;
