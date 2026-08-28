import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import NotificationRow from "@/components/app/account/notifications/NotificationRow";

export const Route = createFileRoute("/_app/_account/notifications")({
  component: NotificationsPage,
});

const MOCK_NOTIFICATION_PREFS = {
  email_high_risk: true,
  email_bulk_done: true,
  email_limit_warning: false,
  email_team_joined: true,
  inapp_high_risk: true,
  inapp_bulk_done: true,
  inapp_limit_warning: true,
  inapp_team_joined: false,
};

function NotificationsPage() {
  const [prefs, setPrefs] = useState(MOCK_NOTIFICATION_PREFS);

  const flip = (key: keyof typeof prefs) =>
    setPrefs((current) => ({ ...current, [key]: !current[key] }));

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground md:px-6 md:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col">
        <header className="border-b border-foreground/10 pb-4">
          <h1 className="text-sm font-medium text-foreground/60">
            Notifications
          </h1>
        </header>

        <div className="flex w-full max-w-3xl flex-col gap-10 py-8">
          <div>
            <h2 className="text-sm font-medium text-foreground">
              Notification preferences
            </h2>
            <p className="mt-1 text-xs text-foreground/50">
              Choose what you're notified about, and how.
            </p>
          </div>

          <section>
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
              Email
            </h3>
            <div className="mt-2">
              <NotificationRow
                label="High-risk analysis detected"
                description="Sent when an analysis returns a HIGH risk level."
                checked={prefs.email_high_risk}
                onChange={() => flip("email_high_risk")}
              />
              <NotificationRow
                label="Bulk analysis finished"
                checked={prefs.email_bulk_done}
                onChange={() => flip("email_bulk_done")}
              />
              <NotificationRow
                label="Usage limit warning"
                description="Sent at 80% of your plan's monthly limit."
                checked={prefs.email_limit_warning}
                onChange={() => flip("email_limit_warning")}
              />
              <NotificationRow
                label="Someone joined your team"
                checked={prefs.email_team_joined}
                onChange={() => flip("email_team_joined")}
              />
            </div>
          </section>

          <section>
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
              In-app
            </h3>
            <div className="mt-2">
              <NotificationRow
                label="High-risk analysis detected"
                checked={prefs.inapp_high_risk}
                onChange={() => flip("inapp_high_risk")}
              />
              <NotificationRow
                label="Bulk analysis finished"
                checked={prefs.inapp_bulk_done}
                onChange={() => flip("inapp_bulk_done")}
              />
              <NotificationRow
                label="Usage limit warning"
                checked={prefs.inapp_limit_warning}
                onChange={() => flip("inapp_limit_warning")}
              />
              <NotificationRow
                label="Someone joined your team"
                checked={prefs.inapp_team_joined}
                onChange={() => flip("inapp_team_joined")}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
