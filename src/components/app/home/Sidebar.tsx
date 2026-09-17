import {
  ChevronRightIcon,
  ClockIcon,
  DocumentMagnifyingGlassIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarProvider";

const sidebarNav = [
  { label: "Dashboard", to: "/dashboard", icon: Squares2X2Icon },
  { label: "Analyse", to: "/analyse", icon: DocumentMagnifyingGlassIcon },
  { label: "History", to: "/history", icon: ClockIcon },
  { label: "Risk score", to: "/risk-score", icon: ExclamationTriangleIcon },
  { label: "Compliance", to: "/compliance", icon: ShieldCheckIcon },
];

export default function Sidebar() {
  const { isCollapsed, toggle } = useSidebar();

  return (
    <>
      {!isCollapsed && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-background/50 backdrop-blur-md md:hidden"
          onClick={toggle}
        />
      )}

      <aside
        className={cn(
          "py-4 sm:py-6 flex h-auto flex-col justify-between overflow-hidden",
          "bg-foreground/5 transition-[width, transform] duration-300 ease-in-out shrink-0",
          isCollapsed
            ? "w-13 sm:w-17.5"
            : "w-56 md:w-42 lg:w-64 max-md:fixed max-md:top-4 max-md:bottom-4 max-md:left-4 max-md:z-50",
        )}
      >
        <nav className="flex flex-col flex-1 md:px-2 py-6 md:py-10 gap-y-5 md:gap-y-6">
          {sidebarNav.map((item) => (
            <NavItem
              key={item.to}
              label={item.label}
              to={item.to}
              icon={item.icon}
            />
          ))}
        </nav>

        <div
          className={cn(
            "flex justify-between gap-y-10 flex-col items-center",
            !isCollapsed && "flex-row sm:flex-col xl:flex-row items-left",
          )}
        >
          <button
            type="button"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={toggle}
            className="w-full flex gap-x-3 items-center py-1 px-4 md:px-6 outline-0"
          >
            <ChevronRightIcon
              className={cn(
                "w-3 h-3 md:w-4 md:h-4 shrink-0 transition-transform duration-200",
                isCollapsed ? "rotate-0" : "rotate-180",
              )}
            />
            {!isCollapsed && <span className="truncate text-sm">Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

const NavItem = ({
  label,
  to,
  icon: Icon,
}: {
  label: string;
  to: string;
  icon: typeof ChevronRightIcon;
}) => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isCollapsed, toggle } = useSidebar();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      onClick={() => {
        const media = window.matchMedia("(max-width: 640px)");
        if (media.matches && !isCollapsed) {
          toggle();
        }
      }}
      className={cn(
        "flex items-center gap-3 px-4 py-2 text-sm transition-colors",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="w-4 h-4  md:w-5 md:h-5 shrink-0" />
      {!isCollapsed && (
        <span className="trucate whitespace-nowrap">{label}</span>
      )}
    </Link>
  );
};
