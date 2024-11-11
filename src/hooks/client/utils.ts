import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

export function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error("Error:", error.message);
    return new Error("An error occurred while fetching data or mutating data");
  }
  return new Error("Unknown error");
}

export type ClientResponse<T> = {
  ok: boolean;
  status: number;
  json: () => Promise<T>;
};

export function createQueryHook<ResponseType, Variables>(
  queryKey: (variables: Variables) => string[],
  fetchFn: (variables: Variables) => Promise<ClientResponse<ResponseType>>,
) {
  return (
    variables: Variables,
    options?: Omit<UseQueryOptions<ResponseType>, "queryKey">,
  ): UseQueryResult<ResponseType> => {
    const queryFn = async () => {
      try {
        const response = await fetchFn(variables);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        throw handleError(error);
      }
    };

    return useQuery<ResponseType>({
      queryKey: queryKey(variables),
      queryFn,
      ...options,
    });
  };
}

export type MutationFunction<Variables> = (
  variables: Variables,
) => Promise<Response>;

export function createMutationHook<T, Variables>(
  mutationFn: MutationFunction<Variables>,
) {
  return (
    options?: Omit<
      UseMutationOptions<T, unknown, Variables, unknown>,
      "mutationFn"
    >,
  ): UseMutationResult<T, unknown, Variables, unknown> => {
    const wrappedMutationFn = async (variables: Variables) => {
      try {
        const response = await mutationFn(variables);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        return (await response.json()) as T;
      } catch (error) {
        throw handleError(error);
      }
    };

    return useMutation<T, unknown, Variables, unknown>({
      mutationFn: wrappedMutationFn,
      ...options,
    });
  };
}
