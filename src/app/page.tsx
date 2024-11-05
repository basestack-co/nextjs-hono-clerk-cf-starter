"use client";

import { client } from "@/utils/hono/client";

export default function Home() {
  return (
    <div>
      <button
        onClick={async () => {
          try {
            const res = await client.api.v1.books.$get();

            const res2 = await client.api.v1.books[":id"].$get({
              param: {
                id: "123",
              },
            });

            const res3 = await client.api.v1.healthcheck.$get();

            const data = await res.json();
            const data2 = await res2.json();
            const data3 = await res3.json();
            console.log("data = ", data);
            console.log("data2 = ", data2);
            console.log("data3 = ", data3);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        CLICK ME
      </button>
    </div>
  );
}
