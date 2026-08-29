import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Profile", to: "/profile" },
  { label: "Notifications", to: "/notifications" },
  { label: "Teams", to: "/teams" },
  { label: "API keys", to: "/api-keys" },
] as const;

const BACK_TO = "/dashboard";

export default function AccountNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      <nav aria-label="Account" className="hidden w-52 shrink-0 lg:flex">
        <div
          className={`flex h-[calc(100%-3rem)] w-full flex-col gap-6
            border-r border-foreground/10 px-5 py-8`}
        >
          <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/40">
            Account
          </p>
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname.startsWith(item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "block border-l-2 border-transparent py-2 pl-4 text-sm text-foreground/60 hover:text-foreground",
                      active &&
                        "border-plum text-plum font-medium hover:text-plum",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            to={BACK_TO}
            className="flex w-fit items-center gap-1.5 text-xs text-foreground/40 hover:text-plum"
          >
            <span aria-hidden="true">←</span>
            Back to dashboard
          </Link>
        </div>
      </nav>

      <nav
        aria-label="Account"
        className="flex flex-col gap-4 border-b border-foreground/10 px-4 py-3 lg:hidden"
      >
        <div className="flex lg:flex-col items-center justify-between py-1">
          <Link
            to={BACK_TO}
            className="order-1 lg:order-0 flex w-fit items-center gap-1.5 text-xs text-foreground/40 hover:text-plum"
          >
            <span aria-hidden="true">←</span>
            Back to dashboard
          </Link>
          <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/40">
            Account
          </span>
        </div>
        <div className="flex gap-4">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "text-sm text-foreground/60 hover:text-foreground px-1",
                  active && "text-plum font-medium hover:text-plum",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
