import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

interface User {
  name: string;
  email: string;
  avatarUrl?: string | null;
}

const user = {
  name: "Jordan Lee",
  email: "jordan@example.com",
  avatarUrl: null,
};

const navLinks = [
  { label: "Profile", to: "/profile" },
  { label: "Teams", to: "/teams" },
  { label: "Notifications", to: "/notifications" },
  { label: "API keys", to: "/api-keys" },
];

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : parts[0].slice(0, 2).toUpperCase();
};

export default function Topbar() {
  return (
    <header className="border-b border-foreground/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <span className="font-bold text-lg tracking-tight text-plum">UUU</span>
        <UserNav user={user} />
      </div>
    </header>
  );
}

const UserNav = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Open account menu"
        className={`flex size-8 rounded-full cursor-pointer items-center justify-center
          border border-foreground/15 bg-foreground/5 text-xs font-medium text-foreground/70
          hover:border-accent hover:text-plum`}
      >
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt="" className="size-full object-cover" />
        ) : (
          getInitials(user.name)
        )}
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 border border-foreground/10 bg-background"
        >
          <div className="flex flex-col gap-0.5 px-4 py-3">
            <span className="truncate text-sm font-medium text-foreground">
              {user.name}
            </span>
            <span className="truncate text-xs text-foreground/50">
              {user.email}
            </span>
          </div>
          <div className="border-t border-foreground/10 py-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                role="menuitem"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-foreground/10 py-1">
            <button
              type="button"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-foreground/70 hover:bg-foreground/5 hover:text-plum"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
