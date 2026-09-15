import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster
        richColors
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: "antialiased rounded-none! font-sans",
            success: "bg-green-100! text-green-800!",
            error: "bg-red-100! text-red-800!",
          },
        }}
      />
    </>
  ),
});
