export interface NotificationPreferences {
  email_bulk_done: boolean;
  email_high_risk: boolean;
  email_limit_warning: boolean;
  email_team_joined: boolean;
  inapp_bulk_done: boolean;
  inapp_high_risk: boolean;
  inapp_limit_warning: boolean;
  inapp_team_joined: boolean;
}

export type NotificationPreference = keyof NotificationPreferences;
