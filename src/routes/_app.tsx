import Topbar from "@/components/app/Topbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-dvh w-dvw flex-col overflow-hidden">
      <Topbar />
      <div className="flex min-h-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
