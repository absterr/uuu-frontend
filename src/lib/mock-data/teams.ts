export interface TeamMember {
  id: number;
  team_id: number;
  user_id: number;
  role: "owner" | "member";
  joined_at: string;
}

export interface Team {
  id: number;
  name: string;
  owner_id: number;
  created_at: string;
  members: TeamMember[];
  total_members: number;
}

export const MOCK_TEAMS: Team[] = [
  {
    id: 1,
    name: "Platform",
    owner_id: 101,
    created_at: "2026-08-12",
    total_members: 3,
    members: [
      {
        id: 1,
        team_id: 1,
        user_id: 101,
        role: "owner",
        joined_at: "2026-08-12",
      },
      {
        id: 2,
        team_id: 1,
        user_id: 184,
        role: "member",
        joined_at: "2026-08-14",
      },
      {
        id: 3,
        team_id: 1,
        user_id: 291,
        role: "member",
        joined_at: "2026-08-19",
      },
    ],
  },
  {
    id: 2,
    name: "Research",
    owner_id: 101,
    created_at: "2026-08-20",
    total_members: 2,
    members: [
      {
        id: 4,
        team_id: 2,
        user_id: 101,
        role: "owner",
        joined_at: "2026-08-20",
      },
      {
        id: 5,
        team_id: 2,
        user_id: 315,
        role: "member",
        joined_at: "2026-08-21",
      },
    ],
  },
];
