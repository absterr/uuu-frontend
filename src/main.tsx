import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import LoadingSpinner from "./components/icons/LoadingSpinner";
import "./index.css";
import { refreshAccessToken } from "./lib/refresh";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
});

const queryClient = new QueryClient();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

async function restoreSession(): Promise<void> {
  await refreshAccessToken();
}

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <div className="flex min-h-screen items-center justify-center">
    <LoadingSpinner />
  </div>,
);

async function bootstrap() {
  await restoreSession();

  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}

bootstrap();
