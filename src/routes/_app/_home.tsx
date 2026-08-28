import { createFileRoute, Outlet } from "@tanstack/react-router";
import Sidebar from "@/components/app/home/Sidebar";
import { SidebarProvider } from "@/components/app/home/SidebarProvider";

export const Route = createFileRoute("/_app/_home")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <div className="flex h-dvh w-dvw overflow-hidden">
        <Sidebar />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
