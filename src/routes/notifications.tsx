import NotificationSection from "@/components/notifications/NotificationSection";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/notifications")({
  component: NotificationsPage,
});

const MOCK_NOTIFICATION_PREFERENCES = {
  email_analysis: true,
  email_risk: true,
  email_team: false,
  inapp_analysis: true,
  inapp_risk: true,
  inapp_team: true,
};

function NotificationsPage() {
  const [preferences, setPreferences] = useState(MOCK_NOTIFICATION_PREFERENCES);

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground md:px-6 md:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col">
        <header className="border-b border-foreground/10 pb-4">
          <h1 className="text-sm font-medium text-foreground/60">
            Notifications
          </h1>
        </header>

        <div className="flex w-full max-w-3xl flex-col py-8">
          <NotificationSection
            title="Analysis"
            description="Choose how you receive analysis updates."
          >
            <div className="flex flex-col">
              {[
                [
                  "email_analysis",
                  "Email",
                  "Receive analysis notifications by email.",
                ],
                [
                  "inapp_analysis",
                  "In-app",
                  "Receive analysis notifications in the app.",
                ],
              ].map(([key, label, description]) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center justify-between gap-4 border-b border-foreground/10 py-4 last:border-0"
                >
                  <span className="flex flex-col gap-1">
                    <span className="text-sm text-foreground">{label}</span>
                    <span className="text-xs text-foreground/50">
                      {description}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={preferences[key as keyof typeof preferences]}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        [key]: e.target.checked,
                      })
                    }
                    className="size-4 accent-accent"
                  />
                </label>
              ))}
            </div>
          </NotificationSection>

          <NotificationSection
            title="Risk alerts"
            description="Stay informed about risk-related events."
          >
            <div className="flex flex-col">
              {[
                ["email_risk", "Email", "Receive risk alerts by email."],
                ["inapp_risk", "In-app", "Receive risk alerts in the app."],
              ].map(([key, label, description]) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center justify-between gap-4 border-b border-foreground/10 py-4 last:border-0"
                >
                  <span className="flex flex-col gap-1">
                    <span className="text-sm text-foreground">{label}</span>
                    <span className="text-xs text-foreground/50">
                      {description}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={preferences[key as keyof typeof preferences]}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        [key]: e.target.checked,
                      })
                    }
                    className="size-4 accent-accent"
                  />
                </label>
              ))}
            </div>
          </NotificationSection>

          <NotificationSection
            title="Team activity"
            description="Notifications about activity in your teams."
          >
            <div className="flex flex-col">
              {[
                ["email_team", "Email", "Receive team notifications by email."],
                [
                  "inapp_team",
                  "In-app",
                  "Receive team notifications in the app.",
                ],
              ].map(([key, label, description]) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-center justify-between gap-4 border-b border-foreground/10 py-4 last:border-0"
                >
                  <span className="flex flex-col gap-1">
                    <span className="text-sm text-foreground">{label}</span>
                    <span className="text-xs text-foreground/50">
                      {description}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={preferences[key as keyof typeof preferences]}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        [key]: e.target.checked,
                      })
                    }
                    className="size-4 accent-accent"
                  />
                </label>
              ))}
            </div>
          </NotificationSection>
        </div>
      </div>
    </main>
  );
}
