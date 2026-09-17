import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import TeamMembers from "@/components/app/account/teams/TeamMembers";
import {
  createTeam,
  generateTeamInvite,
  getTeamMembers,
  getTeams,
} from "@/lib/requests";

export const Route = createFileRoute("/_app/_account/teams")({
  component: TeamsPage,
});

function TeamsPage() {
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newTeamName, setNewTeamName] = useState("");
  const [inviteToken, setInviteToken] = useState<string | null>(null);

  const teamsQuery = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  const teams = teamsQuery.data?.teams ?? [];
  const activeId = selectedId ?? teams[0]?.id ?? null;
  const team = teams.find((item) => item.id === activeId) ?? null;

  const membersQuery = useQuery({
    queryKey: ["team-members", activeId],
    queryFn: () => getTeamMembers(activeId as string),
    enabled: activeId !== null,
  });

  const createMutation = useMutation({
    mutationFn: createTeam,
    onSuccess: async (data) => {
      setNewTeamName("");
      setSelectedId(data.team.id);
      await queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });

  const inviteMutation = useMutation({
    mutationFn: generateTeamInvite,
    onSuccess: (data) => {
      setInviteToken(data.invite.token);
    },
  });

  const handleCreateTeam = () => {
    const name = newTeamName.trim();

    if (!name || createMutation.isPending) return;

    createMutation.mutate(name);
  };

  const handleGenerateInvite = () => {
    if (!activeId || inviteMutation.isPending) return;

    inviteMutation.mutate(activeId);
  };

  return (
    <>
      <header className="border-b border-foreground/10 pb-4">
        <div className="flex flex-col gap-1">
          <span className="hidden font-mono text-[10px] uppercase tracking-wider text-foreground/40 lg:block">
            Teams
          </span>

          <div className="flex max-w-3xl items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {teams.length > 0 ? (
                <select
                  value={activeId ?? ""}
                  onChange={(event) => {
                    setSelectedId(event.target.value);
                    setInviteToken(null);
                  }}
                  className="bg-transparent text-sm font-medium text-foreground outline-none"
                >
                  {teams.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="text-sm font-medium text-foreground">
                  No teams
                </span>
              )}

              {team && (
                <span className="text-xs text-foreground/30">
                  {membersQuery.data?.members.length ?? 0} members
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newTeamName}
                onChange={(event) => setNewTeamName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleCreateTeam();
                }}
                placeholder="Team name"
                className={`w-32 border border-foreground/15 bg-foreground/5 px-3
                  py-2 text-xs text-foreground outline-none focus:border-accent`}
              />

              <button
                type="button"
                onClick={handleCreateTeam}
                disabled={!newTeamName.trim() || createMutation.isPending}
                className={`w-fit cursor-pointer bg-plum px-4 py-2 text-xs font-medium
                  text-background hover:bg-plum/90 disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {createMutation.isPending ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {teamsQuery.isLoading && (
        <div className="flex min-h-40 items-center justify-center text-xs text-foreground/40">
          Loading teams...
        </div>
      )}

      {teamsQuery.isError && (
        <div className="flex min-h-40 items-center justify-center text-xs text-red-500">
          Failed to load teams.
        </div>
      )}

      {!teamsQuery.isLoading && !teamsQuery.isError && !team && (
        <div className="flex min-h-40 items-center justify-center text-xs text-foreground/40">
          No teams yet.
        </div>
      )}

      {team && (
        <div className="flex w-full max-w-3xl flex-col">
          <section className="flex flex-col gap-4 border-b border-foreground/10 py-8">
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-medium text-foreground">
                Invite members
              </h2>
              <p className="text-xs text-foreground/50">
                Generate an invite token for this team.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleGenerateInvite}
                disabled={inviteMutation.isPending}
                className={`w-fit cursor-pointer bg-plum px-4 py-2 text-xs font-medium
                  text-background hover:bg-plum/90 disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {inviteMutation.isPending ? "Generating..." : "Generate invite"}
              </button>

              {inviteToken && (
                <div
                  className={`min-w-0 flex-1 border border-foreground/10 bg-foreground/5
                    px-3 py-2 font-mono text-xs break-all text-foreground/60`}
                >
                  {inviteToken}
                </div>
              )}
            </div>

            {inviteMutation.isError && (
              <p className="text-xs text-red-500">Failed to generate invite.</p>
            )}
          </section>

          <section className="flex flex-col gap-4 py-8">
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-medium text-foreground">Members</h2>
              <p className="text-xs text-foreground/50">
                People with access to this team's analyses.
              </p>
            </div>

            {membersQuery.isLoading && (
              <p className="text-xs text-foreground/40">Loading members...</p>
            )}

            {membersQuery.isError && (
              <p className="text-xs text-red-500">
                Failed to load team members.
              </p>
            )}

            {membersQuery.data && (
              <TeamMembers members={membersQuery.data.members} />
            )}
          </section>
        </div>
      )}
    </>
  );
}
