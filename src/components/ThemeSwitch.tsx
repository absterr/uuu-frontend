"use client";
import { Root, Thumb } from "@radix-ui/react-switch";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { useTheme } from "./theme-provider";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Avoid flicker
  if (!mounted) return <div className="h-6 w-11" />;

  const isDark = theme === "dark";

  return (
    <Root
      checked={isDark}
      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center bg-foreground/15
        rounded-full border-2 border-transparent transition-colors focus-visible:outline-none`}
    >
      <Thumb
        className={`pointer-events-none flex h-5 w-5 items-center justify-center
          rounded-full bg-background shadow-lg ring-0 transition-transform
          data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0`}
      >
        {isDark ? (
          <MoonIcon className="h-3 w-3 text-foreground" />
        ) : (
          <SunIcon className="h-3 w-3 text-foreground" />
        )}
      </Thumb>
    </Root>
  );
}
