import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/api";
import { clearSession } from "@/lib/auth";
import { ThemeSwitch } from "../ThemeSwitch";

interface User {
  name: string;
  email: string;
  avatarUrl?: string | null;
}

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
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="border-b border-foreground/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <span className="text-lg font-bold tracking-tight text-plum">UUU</span>

        <div className="flex items-center gap-x-6 md:gap-x-10">
          <ThemeSwitch />

          {isAuthenticated && user ? (
            <UserNav user={user} />
          ) : (
            <div className="flex items-center gap-4 md:gap-6">
              <Link
                to="/login"
                className={`bg-foreground/5 border border-foreground/10 px-3 py-2
                  text-xs font-medium text-foreground/80 hover:bg-foreground/10 hover:text-foreground`}
              >
                Log in
              </Link>

              <Link
                to="/signup"
                className="bg-plum px-3 py-2 text-xs font-medium text-background hover:bg-plum/90"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const UserNav = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
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
        onClick={() => setIsOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Open account menu"
        className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-foreground/15 bg-foreground/5 text-xs font-medium text-foreground/70 hover:border-accent hover:text-plum"
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt=""
            className="size-full rounded-full object-cover"
          />
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
              onClick={async () => {
                setIsOpen(false);
                const toastId = toast.loading("Logging out...");

                try {
                  await api("/auth/logout", {
                    method: "POST",
                  });

                  clearSession();
                  await navigate({ to: "/login" });
                  toast.dismiss(toastId);
                  toast.success("Logged out successfully.");
                } catch (err) {
                  toast.error(
                    err instanceof Error ? err.message : "Logout failed.",
                    { id: toastId }
                  );
                }
              }}
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
