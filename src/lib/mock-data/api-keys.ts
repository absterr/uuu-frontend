export interface APIKey {
  id: number;
  name: string;
  key: string;
  status: "ACTIVE" | "REVOKED";
  requests_today: number;
  total_requests: number;
  created_at: string;
}

export const MOCK_API_KEYS: APIKey[] = [
  {
    id: 1,
    name: "CI Pipeline",
    key: "sk_live_••••••••••••",
    status: "ACTIVE",
    requests_today: 482,
    total_requests: 18420,
    created_at: "2026-05-14",
  },
  {
    id: 2,
    name: "Staging Bot",
    key: "sk_live_••••••••••••",
    status: "REVOKED",
    requests_today: 0,
    total_requests: 731,
    created_at: "2026-04-02",
  },
  {
    id: 3,
    name: "Reporting Service",
    key: "sk_live_••••••••••••",
    status: "ACTIVE",
    requests_today: 1290,
    total_requests: 84231,
    created_at: "2026-06-21",
  },
];
