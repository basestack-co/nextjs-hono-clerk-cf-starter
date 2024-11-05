import { handle } from "hono/vercel";
// Server
import app from "@/server";

export const runtime = "edge";

export const GET = handle(app);
export const POST = handle(app);
