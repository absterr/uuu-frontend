import { createFileRoute } from "@tanstack/react-router";
import ProfileSection from "@/components/app/account/profile/ProfileSection";

const MOCK_PROFILE = {
  id: 1,
  email: "demo@uuu.dev",
  name: "Demo User",
  plan: "Professional",
  created_at: "2026-07-14T10:30:00Z",
};

export const Route = createFileRoute("/_app/_account/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <>
      <header className="hidden lg:block border-b border-foreground/10 pb-4">
        <h1 className="text-sm font-medium text-foreground/60">Profile</h1>
      </header>

      <div className="flex w-full max-w-3xl flex-col lg:py-8">
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
            <span className="text-sm text-foreground">{MOCK_PROFILE.plan}</span>
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
