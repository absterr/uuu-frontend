import { createFileRoute } from "@tanstack/react-router";

import ProfileSection from "@/components/app/account/profile/ProfileSection";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_app/_account/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, isLoading, isError } = useAuth();

  if (isLoading) {
    return (
      <>
        <header className="hidden border-b border-foreground/10 pb-4 lg:block">
          <h1 className="text-sm font-medium text-foreground/60">Profile</h1>
        </header>

        <div className="flex w-full max-w-3xl flex-col lg:py-8">
          <p className="text-sm text-foreground/50">Loading profile...</p>
        </div>
      </>
    );
  }

  if (isError || !user) {
    return (
      <>
        <header className="hidden border-b border-foreground/10 pb-4 lg:block">
          <h1 className="text-sm font-medium text-foreground/60">Profile</h1>
        </header>

        <div className="flex w-full max-w-3xl flex-col lg:py-8">
          <p className="text-sm text-red-500">Failed to load profile.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <header className="hidden border-b border-foreground/10 pb-4 lg:block">
        <h1 className="text-sm font-medium text-foreground/60">Profile</h1>
      </header>

      <div className="flex w-full max-w-3xl flex-col lg:py-8">
        <ProfileSection
          title="Profile information"
          description="Your account details."
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-foreground/50">Name</span>
              <span className="text-sm text-foreground">{user.name}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs text-foreground/50">Email</span>
              <span className="text-sm text-foreground">{user.email}</span>
            </div>
          </div>
        </ProfileSection>

        <ProfileSection title="Plan" description="Your current account plan.">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-foreground">{user.plan}</span>

            <button
              type="button"
              className="cursor-pointer bg-plum px-3 py-2 text-xs font-medium text-background hover:bg-plum/90"
            >
              Upgrade
            </button>
          </div>
        </ProfileSection>

        <ProfileSection
          title="Password"
          description="Manage your account password."
        >
          <button
            type="button"
            className="w-fit cursor-pointer border border-foreground/15 px-3 py-1.5 text-xs font-medium text-foreground/70 hover:border-accent hover:text-plum"
          >
            Change password
          </button>
        </ProfileSection>
      </div>
    </>
  );
}
