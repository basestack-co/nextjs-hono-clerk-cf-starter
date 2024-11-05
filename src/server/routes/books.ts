import { Hono } from "hono";
// Types
import { Env } from "@/server/types";
// Utils
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const booksRoutes = new Hono<Env>()
  .get("/", (c) => {
    const message = c.var.message;

    return c.json(`list of books message="${message}"`);
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    ),
    (c) => c.json("create a book", 201),
  )
  .get("/:id", (c) => c.json(`get ${c.req.param("id")}`))
  .delete("/:id", (c) => c.json(`delete ${c.req.param("id")}`));

export default booksRoutes;
