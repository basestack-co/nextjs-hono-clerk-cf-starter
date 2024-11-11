import { Hono } from "hono";
// Types
import { Env } from "@/server/types";
// Utils
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const todosRoutes = new Hono<Env>()
  .get("/", async (c) => {
    const userId = c.var.user.id;

    const todos = await c.var.prisma.todo.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return c.json({ todos });
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        completed: z.boolean(),
      }),
    ),
    async (c) => {
      const data = c.req.valid("json");
      const userId = c.var.user.id;

      const todo = await c.var.prisma.todo.create({
        data: {
          userId,
          ...data,
        },
      });

      return c.json({ todo }, 200);
    },
  )
  .get("/:id", async (c) => {
    const userId = c.var.user.id;
    const todoId = c.req.param("id");

    const todo = await c.var.prisma.todo.findFirst({
      where: {
        id: todoId,
        userId,
      },
    });

    return c.json({ todo }, 200);
  })
  .put(
    "/:id",
    zValidator(
      "json",
      z.object({
        completed: z.boolean(),
      }),
    ),
    async (c) => {
      const todoId = c.req.param("id");
      const data = c.req.valid("json");
      const userId = c.var.user.id;

      const todo = await c.var.prisma.todo.update({
        where: {
          id: todoId,
          userId,
        },
        data,
      });

      return c.json({ todo }, 200);
    },
  )
  .delete("/:id", async (c) => {
    const todoId = c.req.param("id");
    const userId = c.var.user.id;

    const todo = await c.var.prisma.todo.delete({
      where: {
        id: todoId,
        userId,
      },
    });

    return c.json({ todo }, 200);
  });

export default todosRoutes;
