import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import LoadingSpinner from "@/components/icons/LoadingSpinner";
import MockAppIcon from "@/components/icons/MockAppIcon";
import { api } from "@/lib/api";
import { setAccessToken } from "@/lib/auth";
import { type LoginForm, loginSchema } from "@/lib/schema/auth-schema";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await api<{ session: { access_token: string } }>(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      setAccessToken(result.session.access_token);
      await navigate({ to: "/dashboard" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to log in");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md px-6 py-12">
        <MockAppIcon />

        <header className="pb-6 text-center">
          <h1 className="text-2xl font-medium text-foreground md:text-3xl">
            Welcome back
          </h1>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-4">
              <label
                htmlFor="email"
                className="text-xs font-medium text-foreground/60"
              >
                Email
              </label>
              {errors.email && (
                <span className="text-[10px] text-red-500 md:text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter email address"
              aria-invalid={!!errors.email}
              {...register("email")}
              className={`h-11 w-full border border-foreground/15 bg-foreground/5 px-3 text-sm
                text-foreground placeholder:text-foreground/30 focus-visible:border-accent
                focus-visible:outline-1 focus-visible:outline-accent`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-4">
              <label
                htmlFor="password"
                className="text-xs font-medium text-foreground/60"
              >
                Password
              </label>
              {errors.password && (
                <span className="text-[10px] text-red-500 md:text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter password"
              aria-invalid={!!errors.password}
              {...register("password")}
              className={`h-11 w-full border border-foreground/15 bg-foreground/5 px-3 text-sm
                text-foreground placeholder:text-foreground/30 focus-visible:border-accent
                focus-visible:outline-1 focus-visible:outline-accent`}
            />

            <div className="flex justify-end">
              <a
                href="/forgot-password"
                className="text-xs text-foreground/40 hover:text-plum xl:hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex h-11 w-full cursor-pointer items-center justify-center bg-plum
                px-4 text-sm font-medium text-background hover:bg-plum/90
                disabled:cursor-not-allowed disabled:bg-foreground/10
                disabled:text-foreground/30`}
            >
              {isSubmitting ? <LoadingSpinner /> : "Log in"}
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
          Don't have an account?{" "}
          <a href="/signup" className="text-foreground hover:text-plum">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
