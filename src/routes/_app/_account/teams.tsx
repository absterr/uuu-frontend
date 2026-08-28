import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import TeamMembers from "@/components/app/account/teams/TeamMembers";
import { MOCK_TEAMS } from "@/lib/mock-data/teams";

export const Route = createFileRoute("/_app/_account/teams")({
  component: TeamsPage,
});

function TeamsPage() {
  const [selectedId, setSelectedId] = useState(MOCK_TEAMS[0]?.id ?? null);

  const team = MOCK_TEAMS.find((item) => item.id === selectedId) ?? null;

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground md:px-6 md:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col">
        <header className="border-b border-foreground/10 pb-4">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
              Teams
            </span>
            <div className="flex items-center justify-between max-w-3xl">
              <div className="flex items-center gap-2">
                <select
                  value={selectedId ?? ""}
                  onChange={(e) => setSelectedId(Number(e.target.value))}
                  className="bg-transparent text-sm font-medium text-foreground outline-none"
                >
                  {MOCK_TEAMS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>

                <span className="text-xs text-foreground/30">
                  {team?.total_members ?? 0} members
                </span>
              </div>

              <button
                type="button"
                className="w-fit cursor-pointer text-xs text-foreground/40 hover:text-plum"
              >
                + New team
              </button>
            </div>
          </div>
        </header>

        {team ? (
          <div className="flex w-full max-w-3xl flex-col">
            <section className="flex flex-col gap-4 border-b border-foreground/10 py-8">
              <div className="flex flex-col gap-1">
                <h2 className="text-sm font-medium text-foreground">
                  Invite members
                </h2>
                <p className="text-xs text-foreground/50">
                  Add people to this team.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  placeholder="Email address"
                  className="min-w-0 flex-1 border border-foreground/15 bg-foreground/5 px-3 py-2 text-xs text-foreground outline-none focus:border-accent"
                />

                <button
                  type="button"
                  className="cursor-pointer bg-plum px-4 py-2 text-xs font-medium text-background hover:bg-plum/90"
                >
                  Invite
                </button>
              </div>
            </section>

            <section className="flex flex-col gap-4 py-8">
              <div className="flex flex-col gap-1">
                <h2 className="text-sm font-medium text-foreground">Members</h2>
                <p className="text-xs text-foreground/50">
                  People with access to this team's analyses.
                </p>
              </div>

              <TeamMembers members={team.members} />
            </section>
          </div>
        ) : (
          <div className="flex min-h-40 items-center justify-center text-xs text-foreground/40">
            No team selected.
          </div>
        )}
      </div>
    </main>
  );
}
