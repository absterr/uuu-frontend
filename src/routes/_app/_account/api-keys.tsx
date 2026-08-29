import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import APIKeyRow from "@/components/app/account/api-keys/APIKeyRows";
import { MOCK_API_KEYS } from "@/lib/mock-data/api-keys";

export const Route = createFileRoute("/_app/_account/api-keys")({
  component: ApiKeysPage,
});

function ApiKeysPage() {
  const [keys, setKeys] = useState(MOCK_API_KEYS);

  function revoke(id: number) {
    setKeys((current) =>
      current.map((apiKey) =>
        apiKey.id === id ? { ...apiKey, status: "REVOKED" } : apiKey,
      ),
    );
  }

  return (
    <>
      <header className="hidden lg:block border-b border-foreground/10 pb-4">
        <h1 className="text-sm font-medium text-foreground/60">API Keys</h1>
      </header>

      <div className="flex flex-col w-full max-w-3xl lg:py-8">
        <section className="flex flex-col gap-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-medium text-foreground">API keys</h2>
              <p className="pt-1 text-xs text-foreground/50">
                Manage keys used to access your account.
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 cursor-pointer bg-plum px-3 py-2 text-xs font-medium text-background hover:bg-plum/90"
            >
              Create key
            </button>
          </div>

          <div>
            {keys.map((apiKey) => (
              <APIKeyRow
                key={apiKey.id}
                apiKey={apiKey}
                onRevoke={() => revoke(apiKey.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
