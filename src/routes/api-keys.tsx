import APIKeysSection from "@/components/api-keys/APIKeysSection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api-keys")({
  component: ApiKeysPage,
});

const MOCK_API_KEYS = [
  {
    id: "key-1",
    name: "Production",
    key: "uuu_live_••••••••••••7f21",
    created: "Aug 12, 2026",
    status: "Active",
  },
  {
    id: "key-2",
    name: "Development",
    key: "uuu_test_••••••••••••91ac",
    created: "Aug 18, 2026",
    status: "Revoked",
  },
];

function ApiKeysPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground md:px-6 md:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col">
        <header className="border-b border-foreground/10 pb-4">
          <h1 className="text-sm font-medium text-foreground/60">API keys</h1>
        </header>

        <div className="flex w-full max-w-3xl flex-col py-8">
          <APIKeysSection
            title="Create API key"
            description="Generate a key for accessing the UUU API."
          >
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Key name"
                className="min-w-0 flex-1 border border-foreground/15 bg-foreground/5 px-3 py-2 text-sm outline-none focus:border-accent"
              />
              <button
                type="button"
                className="cursor-pointer bg-plum px-3 py-2 text-xs font-medium text-background hover:bg-plum/90"
              >
                Create key
              </button>
            </div>
          </APIKeysSection>

          <APIKeysSection
            title="Your API keys"
            description="Manage keys associated with your account."
          >
            <ul className="divide-y divide-foreground/10">
              {MOCK_API_KEYS.map((apiKey) => (
                <li
                  key={apiKey.id}
                  className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="text-sm text-foreground">
                      {apiKey.name}
                    </span>
                    <span className="truncate font-mono text-[10px] text-foreground/40">
                      {apiKey.key}
                    </span>
                    <span className="text-xs text-foreground/40">
                      Created {apiKey.created} · {apiKey.status}
                    </span>
                  </div>

                  <div className="flex shrink-0 gap-3">
                    {apiKey.status === "Active" && (
                      <button
                        type="button"
                        className="cursor-pointer text-xs text-foreground/50 hover:text-plum"
                      >
                        Revoke
                      </button>
                    )}
                    <button
                      type="button"
                      className="cursor-pointer text-xs text-foreground/50 hover:text-plum"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </APIKeysSection>
        </div>
      </div>
    </main>
  );
}
