// Hono Client
import { client } from "@/utils/hono/client";
// Types
import type { InferRequestType, InferResponseType } from "hono/client";
// Utils
import { createQueryHook, createMutationHook } from "@/hooks/client/utils";

// QUERIES

const $get = client.api.v1.todos.$get;
export type AllTodosResponse = InferResponseType<typeof $get>;

export const useAllQuery = createQueryHook<AllTodosResponse, undefined>(
  () => ["todos"],
  () => client.api.v1.todos.$get(),
);

const $getById = client.api.v1.todos[":id"].$get;
export type GetTodoByIdResponse = InferResponseType<typeof $getById>;
export type GetTodoByIdArgs = InferRequestType<typeof $getById>["param"];

export const useByIdQuery = createQueryHook<
  GetTodoByIdResponse,
  GetTodoByIdArgs
>(
  ({ id }) => ["todosById", id],
  ({ id }) =>
    client.api.v1.todos[":id"].$get({
      param: {
        id,
      },
    }),
);

// MUTATIONS

const $post = client.api.v1.todos.$post;
export type CreateTodoResponse = InferResponseType<typeof $post>;
export type CreateTodoInput = InferRequestType<typeof $post>["json"];

export const useCreateMutation = createMutationHook<
  CreateTodoResponse,
  CreateTodoInput
>((data) => client.api.v1.todos.$post({ json: data }));

const $updateById = client.api.v1.todos[":id"].$put;
export type UpdateTodoByIdResponse = InferResponseType<typeof $updateById>;
export type UpdateTodoByIdArgs = InferRequestType<
  typeof $updateById
>["json"] & { id: string };

export const useUpdateMutation = createMutationHook<
  UpdateTodoByIdResponse,
  UpdateTodoByIdArgs
>(({ id, completed }) =>
  client.api.v1.todos[":id"].$put({ param: { id }, json: { completed } }),
);

const $deleteById = client.api.v1.todos[":id"].$delete;
export type DeleteTodoByIdResponse = InferResponseType<typeof $deleteById>;
export type DeleteTodoByIdArgs = InferRequestType<typeof $deleteById>["param"];

export const useDeleteMutation = createMutationHook<
  DeleteTodoByIdResponse,
  DeleteTodoByIdArgs
>(({ id }) => client.api.v1.todos[":id"].$delete({ param: { id } }));
