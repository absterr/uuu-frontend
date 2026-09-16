import { ThemeProvider } from "@/components/theme-provider";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
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
    </ThemeProvider>
  ),
});
