import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_home/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello mate</div>;
}
