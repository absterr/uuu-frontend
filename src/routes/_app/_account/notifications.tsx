import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import NotificationRow from "@/components/app/account/notifications/NotificationRow";
import {
  getNotificationPreferences,
  updateNotificationPreference,
} from "@/lib/requests";
import type {
  NotificationPreference,
  NotificationPreferences,
} from "@/lib/types/notifications";

export const Route = createFileRoute("/_app/_account/notifications")({
  component: NotificationsPage,
});

const QUERY_KEY = ["notification-preferences"];

function NotificationsPage() {
  const queryClient = useQueryClient();

  const {
    data: prefs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getNotificationPreferences,
  });

  const mutation = useMutation({
    mutationFn: ({
      key,
      value,
    }: {
      key: NotificationPreference;
      value: boolean;
    }) => updateNotificationPreference(key, value),

    onMutate: async ({ key, value }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });

      const previous =
        queryClient.getQueryData<NotificationPreferences>(QUERY_KEY);

      queryClient.setQueryData<NotificationPreferences>(QUERY_KEY, (current) =>
        current ? { ...current, [key]: value } : current,
      );

      return { previous };
    },

    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(QUERY_KEY, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const flip = (key: NotificationPreference) => {
    if (!prefs || mutation.isPending) return;

    mutation.mutate({
      key,
      value: !prefs[key],
    });
  };

  return (
    <>
      <header className="hidden border-b border-foreground/10 pb-4 lg:block">
        <h1 className="text-sm font-medium text-foreground/60">
          Notifications
        </h1>
      </header>

      <div className="flex w-full max-w-3xl flex-col gap-10 lg:py-8">
        <div>
          <h2 className="text-sm font-medium text-foreground">
            Notification preferences
          </h2>
          <p className="mt-1 text-xs text-foreground/50">
            Choose what you're notified about, and how.
          </p>
        </div>

        {isLoading && (
          <p className="text-xs text-foreground/40">Loading preferences...</p>
        )}

        {isError && (
          <p className="text-sm text-plum">
            Failed to load notification preferences.
          </p>
        )}

        {prefs && (
          <>
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

            {mutation.isError && (
              <p className="text-xs text-plum">
                Failed to save notification preference.
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
}
