export interface Profile {
  id: number;
  email: string;
  name: string;
  plan: string;
  created_at: string;
}

export const MOCK_PROFILE: Profile = {
  id: 1,
  email: "demo@uuu.dev",
  name: "Demo User",
  plan: "Professional",
  created_at: "2026-07-14T10:30:00Z",
};
