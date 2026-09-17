import type { TeamMember } from "@/lib/types/teams";

interface Props {
  members: TeamMember[];
}

export default function TeamMembers({ members }: Props) {
  return (
    <div className="divide-y divide-foreground/10">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between gap-4 py-4"
        >
          <div className="flex min-w-0 flex-col gap-1">
            <span className="truncate text-xs md:text-sm text-foreground">
              {member.name}
            </span>

            {member.email && (
              <span className="truncate text-[10px] md:text-xs text-foreground/40">
                {member.email}
              </span>
            )}
          </div>

          <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-foreground/40">
            {member.role}
          </span>
        </div>
      ))}
    </div>
  );
}
