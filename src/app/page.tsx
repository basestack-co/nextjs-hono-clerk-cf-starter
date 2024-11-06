"use client";

import { useState, useCallback } from "react";
// Components
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { Checkbox } from "@/components/Checkbox";
import { Input } from "@/components/Input";
// Icons
import { Trash2 } from "lucide-react";
// Auth
import { useAuth } from "@clerk/nextjs";
// Hooks
import api from "@/hooks/client/api";
// Auth
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// Types
import { CreateTodoInput, useCreateMutation } from "@/hooks/client/api/todos";
// Utils
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const { isLoaded, userId } = useAuth();

  const { data, isLoading, refetch } = api.todos.useAllQuery(undefined, {
    enabled: true,
  });

  const [todos, setTodos] = useState<CreateTodoInput[]>([]);
  const [title, setTitle] = useState("");

  const { mutate } = api.todos.useCreateMutation({
    onSuccess: () => {
      setTitle("");
      refetch();
    },
  });

  const oAddTodo = useCallback(() => {
    if (title.trim() !== "" && userId) {
      mutate({
        id: uuidv4(),
        userId,
        title,
        description: "New task description",
        completed: false,
      });
    }
  }, [mutate, userId, title]);

  const onToggleTodo = useCallback((id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const onDeleteTodo = useCallback((id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }, []);

  const onRenderContent = useCallback(() => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!data?.todos.length) {
      return <div>There no TODOs</div>;
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
                  onCheckedChange={() => onToggleTodo(todo.id)}
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
  }, [isLoading, data]);

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
                disabled={isLoading}
              />
              <Button onClick={oAddTodo} disabled={isLoading}>
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
