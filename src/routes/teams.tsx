import TeamSection from "@/components/teams/TeamSection";
import { createFileRoute } from "@tanstack/react-router";

const MOCK_TEAMS = [
  {
    id: "team-1",
    name: "Engineering",
    members: 4,
  },
  {
    id: "team-2",
    name: "Legacy Systems",
    members: 7,
  },
];

export const Route = createFileRoute("/teams")({
  component: TeamsPage,
});

function TeamsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground md:px-6 md:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col">
        <header className="border-b border-foreground/10 pb-4">
          <h1 className="text-sm font-medium text-foreground/60">Teams</h1>
        </header>

        <div className="flex w-full max-w-3xl flex-col py-8">
          <TeamSection
            title="Create team"
            description="Create a team to collaborate on analyses."
          >
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Team name"
                className="min-w-0 flex-1 border border-foreground/15 bg-foreground/5 px-3 py-2 text-sm outline-none focus:border-accent"
              />
              <button
                type="button"
                className="cursor-pointer bg-plum px-3 py-2 text-xs font-medium text-background hover:bg-plum/90"
              >
                Create
              </button>
            </div>
          </TeamSection>

          <TeamSection
            title="Your teams"
            description="Teams you currently belong to."
          >
            <ul className="divide-y divide-foreground/10">
              {MOCK_TEAMS.map((team) => (
                <li
                  key={team.id}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-foreground">{team.name}</span>
                    <span className="text-xs text-foreground/50">
                      {team.members} members
                    </span>
                  </div>

                  <button
                    type="button"
                    className="cursor-pointer text-xs text-foreground/50 hover:text-plum"
                  >
                    View team →
                  </button>
                </li>
              ))}
            </ul>
          </TeamSection>
        </div>
      </div>
    </main>
  );
}
