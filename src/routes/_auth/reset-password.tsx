import LoadingSpinner from "@/components/icons/LoadingSpinner";
import MockAppIcon from "@/components/icons/MockAppIcon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/reset-password")({
  component: RouteComponent,
});

function RouteComponent() {
  const isPending = false;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md px-6 py-12">
        <MockAppIcon />

        <header className="pb-8 text-center">
          <h1 className="text-2xl font-medium text-foreground md:text-3xl">
            Reset password
          </h1>
        </header>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-medium text-foreground/60"
            >
              New password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Enter new password"
              className="h-11 w-full border border-foreground/15 bg-foreground/5 px-3 text-sm
                  text-foreground placeholder:text-foreground/30 focus-visible:border-accent
                  focus-visible:outline-1 focus-visible:outline-accent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="confirm-password"
              className="text-xs font-medium text-foreground/60"
            >
              Confirm password
            </label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Confirm new password"
              className="h-11 w-full border border-foreground/15 bg-foreground/5 px-3 text-sm
                  text-foreground placeholder:text-foreground/30 focus-visible:border-accent
                  focus-visible:outline-1 focus-visible:outline-accent"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="flex h-11 w-full cursor-pointer items-center justify-center bg-plum
                px-4 text-sm font-medium text-background hover:bg-plum/90
                disabled:bg-foreground/10 disabled:text-foreground/30"
          >
            {isPending ? <LoadingSpinner /> : "Reset password"}
          </button>
        </form>
      </div>
    </main>
  );
}
