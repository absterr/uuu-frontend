import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import LoadingSpinner from "@/components/icons/LoadingSpinner";
import MockAppIcon from "@/components/icons/MockAppIcon";
import { api } from "@/lib/api";
import {
  type ResetPasswordForm,
  resetPasswordSchema,
} from "@/lib/schema/auth-schema";

export const Route = createFileRoute("/_auth/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      toast.error("Invalid reset token");
      return;
    }

    const toastId = toast.loading("Resetting password...");

    try {
      await api("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          token,
          new_password: data.password,
        }),
      });

      toast.success("Password reset successfully", { id: toastId });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to reset password",
        { id: toastId },
      );
    }
  };

  const hasToken = new URLSearchParams(window.location.search).has("token");

  if (!hasToken) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-md px-6 py-12 text-center">
          <MockAppIcon />

          <header>
            <h1 className="pb-2 text-2xl font-medium text-foreground md:text-3xl">
              Invalid reset link
            </h1>
            <p className="text-sm text-foreground/50">
              This password reset link is invalid. Please request a new one.
            </p>
          </header>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md px-6 py-12">
        <MockAppIcon />

        <header className="pb-8 text-center">
          <h1 className="text-2xl font-medium text-foreground md:text-3xl">
            Reset password
          </h1>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-4">
              <label
                htmlFor="password"
                className="text-xs font-medium text-foreground/60"
              >
                New password
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
              autoComplete="new-password"
              placeholder="Enter new password"
              aria-invalid={!!errors.password}
              {...register("password")}
              className={`h-11 w-full border border-foreground/15 bg-foreground/5 px-3 text-sm
                text-foreground placeholder:text-foreground/30 focus-visible:border-accent
                focus-visible:outline-1 focus-visible:outline-accent`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-4">
              <label
                htmlFor="confirm-password"
                className="text-xs font-medium text-foreground/60"
              >
                Confirm password
              </label>
              {errors.confirmPassword && (
                <span className="text-[10px] text-red-500 md:text-xs">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              placeholder="Confirm new password"
              aria-invalid={!!errors.confirmPassword}
              {...register("confirmPassword")}
              className={`h-11 w-full border border-foreground/15 bg-foreground/5 px-3 text-sm
                text-foreground placeholder:text-foreground/30 focus-visible:border-accent
                focus-visible:outline-1 focus-visible:outline-accent`}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex h-11 w-full cursor-pointer items-center justify-center bg-plum
              px-4 text-sm font-medium text-background hover:bg-plum/90
              disabled:cursor-not-allowed disabled:bg-foreground/10
              disabled:text-foreground/30`}
          >
            {isSubmitting ? <LoadingSpinner /> : "Reset password"}
          </button>
        </form>
      </div>
    </main>
  );
}
