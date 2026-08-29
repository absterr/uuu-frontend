import { createFileRoute, Outlet } from "@tanstack/react-router";
import AccountNav from "@/components/app/account/AccountNav";

export const Route = createFileRoute("/_app/_account")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div
      className={`mx-auto h-full min-h-0 w-full max-w-7xl min-w-0
        flex-1 flex flex-col lg:flex-row lg:px-8 overflow-hidden`}
    >
      <AccountNav />
      <main
        className={`min-h-0 flex-1 overflow-y-auto bg-background text-foreground px-4 py-6 lg:px-8 lg:py-10`}
      >
        <Outlet />
      </main>
    </div>
  );
}
