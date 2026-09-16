import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import Topbar from "@/components/app/Topbar";
import { getAccessToken } from "@/lib/auth";

export const Route = createFileRoute("/_app")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/analyse") return;

    if (!getAccessToken()) {
      throw redirect({ to: "/login" });
    }
  },
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
