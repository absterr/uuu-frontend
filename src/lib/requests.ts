import { api } from "./api";
import type { APIKeysResponse, CreateAPIKeyResponse } from "./types/api-keys";
import type {
  NotificationPreference,
  NotificationPreferences,
} from "./types/notifications";

export function getAPIKeys() {
  return api<APIKeysResponse>("/apikeys");
}

export function createAPIKey(name: string) {
  return api<CreateAPIKeyResponse>("/apikeys", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

export function revokeAPIKey(id: string) {
  return api<{ message: string }>(`/apikeys/${id}/revoke`, {
    method: "PUT",
  });
}

export function deleteAPIKey(id: string) {
  return api<{ message: string }>(`/apikeys/${id}`, {
    method: "DELETE",
  });
}

export function getNotificationPreferences() {
  return api<NotificationPreferences>("/notifications/preferences");
}

export function updateNotificationPreference(
  key: NotificationPreference,
  value: boolean
) {
  return api<{ message: string; preferences: NotificationPreferences }>(
    "/notifications/preferences",
    {
      method: "PUT",
      body: JSON.stringify({ [key]: value }),
    }
  );
}
