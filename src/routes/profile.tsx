import ProfileSection from "@/components/profile/ProfileSection";
import { MOCK_PROFILE } from "@/lib/mock-data/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground md:px-6 md:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col">
        <header className="border-b border-foreground/10 pb-4">
          <h1 className="text-sm font-medium text-foreground/60">Profile</h1>
        </header>

        <div className="flex w-full max-w-3xl flex-col py-8">
          <ProfileSection
            title="Profile information"
            description="Your account details."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-foreground/50">Name </span>
                <span className="text-sm text-foreground">
                  {MOCK_PROFILE.name}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs text-foreground/50">Email </span>
                <span className="text-sm text-foreground">
                  {MOCK_PROFILE.email}
                </span>
              </div>
            </div>
          </ProfileSection>

          <ProfileSection title="Plan" description="Your current account plan.">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-foreground">
                {MOCK_PROFILE.plan}
              </span>
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
      </div>
    </main>
  );
}
