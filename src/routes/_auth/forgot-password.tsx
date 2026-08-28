import LoadingSpinner from "@/components/icons/LoadingSpinner";
import MockAppIcon from "@/components/icons/MockAppIcon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const isPending = false;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md px-6 py-12">
        <MockAppIcon />

        <header className="pb-6 text-center">
          <h1 className="pb-2 text-2xl font-medium text-foreground md:text-3xl">
            Forgot your password?
          </h1>
          <p className="text-sm text-foreground/50">
            Enter your account email and we'll send you instructions to reset
            your password.
          </p>
        </header>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium text-foreground/60"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter email address"
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
            {isPending ? <LoadingSpinner /> : "Send reset email"}
          </button>
        </form>
      </div>
    </main>
  );
}
