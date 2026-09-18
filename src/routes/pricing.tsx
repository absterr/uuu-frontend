import { createFileRoute } from "@tanstack/react-router";
import { PLANS, type Plan } from "../lib/plans";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

function PricingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-foreground/10 px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
            Pricing
          </span>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Choose the plan that fits your workflow.
          </h1>

          <p className="max-w-2xl text-sm leading-7 text-foreground/60 md:text-base">
            Start understanding your legacy systems today and scale as your
            analysis needs grow.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-5">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>
    </main>
  );
}

const PricingCard = ({ plan }: { plan: Plan }) => (
  <article className="flex flex-col border border-foreground/10 p-6">
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
        {plan.name}
      </span>

      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-semibold">${plan.price}</span>
        <span className="text-xs text-foreground/40">/ month</span>
      </div>
    </div>

    <div className="my-6 border-t border-foreground/10" />

    <ul className="flex flex-col gap-3 text-sm text-foreground/70">
      <li>
        {plan.analysesPerMonth === -1
          ? "Unlimited analyses"
          : `${plan.analysesPerMonth} analyses / month`}
      </li>

      <li>{plan.bulkUpload ? "Bulk upload" : "Single file analysis"}</li>

      <li>{plan.pdfReports ? "PDF reports" : "No PDF reports"}</li>

      <li>
        {plan.teamMembers === -1
          ? "Unlimited team members"
          : `${plan.teamMembers} team member${plan.teamMembers === 1 ? "" : "s"}`}
      </li>

      <li>{plan.apiAccess ? "API access" : "No API access"}</li>
    </ul>

    <button
      type="button"
      className="mt-8 border border-foreground/15 px-4 py-3 text-sm font-medium
          hover:border-foreground/30"
    >
      {plan.id === "free" ? "Get started" : "Choose plan"}
    </button>
  </article>
);
