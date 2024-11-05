// Types
import { AppType } from "@/server/types";
// Hono
import { hc } from "hono/client";
// Utils
import { getBaseUrl } from "@/utils/browser";

export const client = hc<AppType>(getBaseUrl());
