// Hono Client
import { client } from "@/utils/hono/client";
// Types
import type { InferRequestType, InferResponseType } from "hono/client";
// Utils
import { createQueryHook } from "@/hooks/client/utils";

// InferRequestType<typeof $post>['form']

// QUERIES

const $get = client.api.v1.books.$get;

export type BooksResponse = InferResponseType<typeof $get>;

export const useAllQuery = createQueryHook<BooksResponse, undefined>(
  () => ["books"],
  () => client.api.v1.books.$get(),
);

const $getById = client.api.v1.books[":id"].$get;
export type BooksByIdResponse = InferResponseType<typeof $getById>;
export type BooksByIdArgs = InferRequestType<typeof $getById>["param"];

export const useByIdQuery = createQueryHook<BooksByIdResponse, BooksByIdArgs>(
  ({ id }) => ["booksById", id],
  ({ id }) =>
    client.api.v1.books[":id"].$get({
      param: {
        id,
      },
    }),
);
