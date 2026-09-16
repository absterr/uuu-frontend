import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getAccessToken } from "@/lib/auth";

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    if (getAccessToken()) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
