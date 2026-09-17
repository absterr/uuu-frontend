export type TeamRole = "owner" | "admin" | "member";

export interface Team {
  id: string;
  name: string;
  owner_id: string;
  created_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  name: string | null;
  email: string | null;
  role: TeamRole;
  joined_at: string;
}

export interface TeamsResponse {
  teams: Team[];
}

export interface TeamResponse {
  team: Team;
}

export interface TeamMembersResponse {
  members: TeamMember[];
}

export interface CreateTeamResponse {
  message: string;
  team: Team;
}

export interface Invite {
  id: string;
  team_id: string;
  token: string;
  invited_by: string;
  used: boolean;
  created_at: string;
}

export interface InviteResponse {
  invite: Invite;
}
