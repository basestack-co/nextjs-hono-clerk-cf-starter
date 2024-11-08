"use client";

import { useState, useCallback } from "react";
// Components
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { Checkbox } from "@/components/Checkbox";
import { Input } from "@/components/Input";
import { Skeleton } from "@/components/Skeleton";
// Icons
import { Trash2, ClipboardList } from "lucide-react";
// Auth
import { useAuth } from "@clerk/nextjs";
// Hooks
import api from "@/hooks/client/api";
// Auth
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// Utils
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const { isLoaded, userId } = useAuth();

  const { data, isLoading, refetch } = api.todos.useAllQuery(undefined, {
    enabled: true,
  });

  const [title, setTitle] = useState("");

  const { mutate: createTodoMutate, isPending: isCreatePending } =
    api.todos.useCreateMutation({
      onSuccess: () => {
        setTitle("");
        refetch();
      },
    });

  const { mutate: deleteTodoMutate, isPending: isDeletePending } =
    api.todos.useDeleteMutation({
      onSuccess: () => {
        refetch();
      },
    });

  const { mutate: updateTodoMutate, isPending: isUpdatePending } =
    api.todos.useUpdateMutation({
      onSuccess: () => {
        refetch();
      },
    });

  const isDisabled =
    isLoading || isCreatePending || isDeletePending || isUpdatePending;

  const oAddTodo = useCallback(() => {
    if (title.trim() !== "" && userId) {
      createTodoMutate({
        id: uuidv4(),
        userId,
        title,
        description: "New task description",
        completed: false,
      });
    }
  }, [createTodoMutate, userId, title]);

  const onToggleTodo = useCallback(
    (id: string, completed: boolean) => {
      updateTodoMutate({ id, completed: !completed });
    },
    [updateTodoMutate],
  );

  const onDeleteTodo = useCallback(
    (id: string) => {
      deleteTodoMutate({ id });
    },
    [deleteTodoMutate],
  );

  const onRenderContent = useCallback(() => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-4 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (!data?.todos.length) {
      return (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12 pt-6 text-center">
            <ClipboardList className="mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              No TODOs yet
            </h3>
            <p className="text-sm text-gray-600">
              Add a new TODO to get started. Your tasks will appear here.
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-4">
        {data.todos.map((todo) => (
          <Card key={todo.id}>
            <CardContent className="flex items-start justify-between pt-6">
              <div className="flex items-start space-x-4">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onCheckedChange={() => onToggleTodo(todo.id, todo.completed)}
                />
                <div>
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`font-semibold ${todo.completed ? "text-gray-500 line-through" : "text-gray-900"}`}
                  >
                    {todo.title}
                  </label>
                  <p
                    className={`text-sm ${todo.completed ? "text-gray-400 line-through" : "text-gray-600"}`}
                  >
                    {todo.description}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteTodo(todo.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete todo</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }, [isLoading, data, onDeleteTodo, onToggleTodo]);

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">TODOs App</h1>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Add a new TODO"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-grow"
                disabled={isDisabled}
              />
              <Button onClick={oAddTodo} disabled={isDisabled}>
                Add TODO
              </Button>
            </div>
          </CardContent>
        </Card>
        {onRenderContent()}
      </main>
    </div>
  );
}
