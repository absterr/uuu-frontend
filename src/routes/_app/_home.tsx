import { createFileRoute, Outlet } from "@tanstack/react-router";

import Sidebar from "@/components/app/home/Sidebar";
import { SidebarProvider } from "@/components/app/home/SidebarProvider";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_app/_home")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = useAuth();

  return (
    <SidebarProvider>
      <div className="flex h-full min-h-0 flex-1 overflow-hidden">
        {isAuthenticated && <Sidebar />}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
