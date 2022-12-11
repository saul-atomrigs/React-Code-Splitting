import { lazy } from "react";

type LazyLoad = {
  path: string;
  namedExport: string | number | null;
};

export function lazyLoad({
  path,
  namedExport,
}: LazyLoad): ReturnType<typeof lazy> {
  return lazy(() => {
    const promise = import(path);
    if (namedExport == null) {
      return promise;
    } else {
      return promise.then((module) => ({ default: module[namedExport] }));
    }
  });
}

// How to use:
// lazyLoad("src/components/MyComponent", "MyComponent")
