import LoadingSpinner from "@/components/icons/LoadingSpinner";
import MockAppIcon from "@/components/icons/MockAppIcon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/signup")({
  component: AnalysePage,
});

function AnalysePage() {
  const isPending = false;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md px-6 py-12">
        <MockAppIcon />

        <header className="pb-6 text-center">
          <h1 className="pb-2 text-2xl font-medium text-foreground md:text-3xl">
            Create your account
          </h1>
          <p className="text-sm text-foreground/50">
            Create an account to start analyzing your COBOL systems.
          </p>
        </header>

        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-xs font-medium text-foreground/60"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              className="h-11 w-full border border-foreground/15 bg-foreground/5 px-3 text-sm
                  text-foreground placeholder:text-foreground/30 focus-visible:border-accent
                  focus-visible:outline-1 focus-visible:outline-accent"
            />
          </div>

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
              placeholder="Enter your email address"
              className="h-11 w-full border border-foreground/15 bg-foreground/5 px-3 text-sm
                  text-foreground placeholder:text-foreground/30 focus-visible:border-accent
                  focus-visible:outline-1 focus-visible:outline-accent"
            />
          </div>

          <div className="py-3">
            <hr className="border-foreground/10" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-medium text-foreground/60"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Enter your password"
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
              placeholder="Confirm your password"
              className="h-11 w-full border border-foreground/15 bg-foreground/5 px-3 text-sm
                  text-foreground placeholder:text-foreground/30 focus-visible:border-accent
                  focus-visible:outline-1 focus-visible:outline-accent"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="flex h-11 w-full cursor-pointer items-center justify-center bg-plum
                  px-4 text-sm font-medium text-background hover:bg-plum/90
                  disabled:bg-foreground/10 disabled:text-foreground/30"
            >
              {isPending ? <LoadingSpinner /> : "Create account"}
            </button>
          </div>
        </form>

        <p className="pt-6 text-center text-xs text-foreground/40">
          By continuing, you agree to our{" "}
          <a href="#" className="text-foreground/70 underline hover:text-plum">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-foreground/70 underline hover:text-plum">
            Privacy Policy
          </a>
          .
        </p>

        <p className="pt-6 text-center text-sm text-foreground/50">
          Already have an account?{" "}
          <a href="/login" className="text-foreground hover:text-plum">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
