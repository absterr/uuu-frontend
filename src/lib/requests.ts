import { api } from "./api";
import type { APIKeysResponse, CreateAPIKeyResponse } from "./types/api-keys";
import type { HistoryResponse } from "./types/history";
import type {
  NotificationPreference,
  NotificationPreferences,
} from "./types/notifications";
import type { RiskScoreResponse } from "./types/risk";
import type {
  CreateTeamResponse,
  InviteResponse,
  TeamMembersResponse,
  TeamsResponse,
} from "./types/teams";

// --- History ---

export function getHistory() {
  return api<HistoryResponse>("/history");
}

// --- Risk ---

export function getRiskScore() {
  return api<RiskScoreResponse>("/risk/score");
}

// --- API Keys ---

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

// --- Notifications ---

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

// --- Teams ---

export function getTeams() {
  return api<TeamsResponse>("/teams");
}

export function getTeamMembers(teamId: string) {
  return api<TeamMembersResponse>(`/teams/${teamId}/members`);
}

export function createTeam(name: string) {
  return api<CreateTeamResponse>("/teams", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

export function generateTeamInvite(teamId: string) {
  return api<InviteResponse>(`/teams/${teamId}/invites`, {
    method: "POST",
  });
}
