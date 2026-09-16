export type APIKeyStatus = "ACTIVE" | "REVOKED";

export interface APIKey {
  id: string;
  name: string;
  key: string;
  active: boolean;
  status: APIKeyStatus;
  requests_today: number;
  total_requests: number;
  created_at: string;
  last_used: string | null;
}

export interface APIKeyUsage {
  total_keys: number;
  active_keys: number;
  total_requests: number;
  requests_today: number;
}

export interface APIKeysResponse {
  usage: APIKeyUsage;
  api_keys: APIKey[];
}

export interface CreateAPIKeyResponse {
  api_key: APIKey;
}
