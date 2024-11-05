"use client";

// Hooks
import api from "@/hooks/client/api";

export default function PostsPage() {
  const { data } = api.books.useAllQuery(undefined, {
    enabled: true,
  });

  const joe = api.books.useByIdQuery(
    { id: "400" },
    {
      enabled: true,
    },
  );

  console.log("joe = ", joe.data);

  return <div>Hey Book {data ?? ""}</div>;
}
