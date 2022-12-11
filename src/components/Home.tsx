import React, { lazy, Suspense, useState, useTransition } from "react";

const AdminData = lazy(() =>
  import("./AdminData").then((module) => {
    return { default: module.AdminData };
  })
);

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);

  const [isPending, startTransition] = useTransition();

  return (
    <>
      <h1>Home</h1>
      <button
        onClick={() => {
          import("../utils/sum").then((module) => {
            alert(module.sum(2, 2));
          });
        }}
      >
        Add 2+2
      </button>

      <br />
      <br />
      <button onClick={() => setIsAdmin((prev) => !prev)}>Toggle Admin</button>
      <Suspense fallback={<h2>loading...</h2>}>
        {isAdmin ? <AdminData /> : <h2>Not admin</h2>}
      </Suspense>

      <button
        onClick={() =>
          startTransition(() => {
            setIsAdmin((prev) => !prev);
          })
        }
      >
        Toggle Admin with useTransition
      </button>
      {isPending && <h2>loading...</h2>}
    </>
  );
}
