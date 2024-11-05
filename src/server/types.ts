import { privateRoutes, publicRoutes } from "@/server";

export type Variables = {
  message: string;
};

export type Env = {
  Variables: Variables;
};

export type AppType = typeof privateRoutes | typeof publicRoutes;
