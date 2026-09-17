import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import LoadingSpinner from "@/components/icons/LoadingSpinner";
import MockAppIcon from "@/components/icons/MockAppIcon";
import { api } from "@/lib/api";
import { type SignupForm, signupSchema } from "@/lib/schema/auth-schema";

export const Route = createFileRoute("/_auth/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      await api("/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });

      toast.success("Account created. Check your email to verify it.");

      await navigate({ to: "/login" });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Account creation failed",
      );
    }
  };

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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="name"
                className="text-xs font-medium text-foreground/60"
              >
                Name
              </label>

              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <input
              {...register("name")}
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              className="h-11 w-full border border-foreground/15 bg-foreground/5
              px-3 text-sm text-foreground placeholder:text-foreground/30 focus-visible:border-accent
              focus-visible:outline-1 focus-visible:outline-accent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="email"
                className="text-xs font-medium text-foreground/60"
              >
                Email
              </label>

              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <input
              {...register("email")}
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
              className="h-11 w-full border border-foreground/15 bg-foreground/5
              px-3 text-sm text-foreground placeholder:text-foreground/30 focus-visible:border-accent
              focus-visible:outline-1 focus-visible:outline-accent"
            />
          </div>

          <div className="py-3">
            <hr className="border-foreground/10" />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-xs font-medium text-foreground/60"
              >
                Password
              </label>

              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <input
              {...register("password")}
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Enter your password"
              className="h-11 w-full border border-foreground/15 bg-foreground/5
              px-3 text-sm text-foreground placeholder:text-foreground/30
              focus-visible:border-accent focus-visible:outline-1 focus-visible:outline-accent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirm-password"
                className="text-xs font-medium text-foreground/60"
              >
                Confirm password
              </label>

              {errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <input
              {...register("confirmPassword")}
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              placeholder="Confirm your password"
              className={`h-11 w-full border border-foreground/15 bg-foreground/5
                px-3 text-sm text-foreground placeholder:text-foreground/30
                focus-visible:border-accent focus-visible:outline-1 focus-visible:outline-accent`}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`h-11 w-full flex items-center justify-center px-4 text-sm
                font-medium text-background bg-plum hover:bg-plum/90 disabled:bg-foreground/10
                disabled:text-foreground/30 disabled:cursor-not-allowed cursor-pointer`}
            >
              {isSubmitting ? <LoadingSpinner /> : "Create account"}
            </button>
          </div>
        </form>

        <p className="pt-6 text-center text-xs text-foreground/40">
          By continuing, you agree to our{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.example.com/terms"
            className="text-foreground/70 underline hover:text-plum"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.example.com/privacy"
            className="text-foreground/70 underline hover:text-plum"
          >
            Privacy Policy
          </a>
          .
        </p>

        <p className="pt-6 text-center text-sm text-foreground/50">
          Already have an account?{" "}
          <Link to="/login" className="text-foreground hover:text-plum">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
