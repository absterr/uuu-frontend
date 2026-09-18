import AppIcon from "@/components/icons/AppIcon";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-foreground/10 px-4 py-20 md:px-6 md:py-32">
        <AppIcon />

        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            Understand the systems that run your business.
          </h1>

          <p className="max-w-2xl text-base leading-7 text-foreground/60 md:text-lg">
            Analyse legacy COBOL, uncover risk, map dependencies, and turn
            complex source code into something your team can actually
            understand.
          </p>

          <div className="flex gap-4">
            <Link
              to="/analyse"
              className="bg-plum px-5 py-3 text-sm font-medium text-background
                hover:bg-plum/90"
            >
              Analyse code
            </Link>

            <Link
              to="/pricing"
              className="border border-foreground/15 px-5 py-3 text-sm
                font-medium hover:border-foreground/30"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-foreground/10 px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-px border border-foreground/10 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Analyse",
              description:
                "Break down COBOL into clear summaries, explanations, and identified risks.",
            },
            {
              title: "Map",
              description:
                "Visualise program flow and relationships through an interactive code map.",
            },
            {
              title: "Convert",
              description:
                "Generate a Python equivalent to help teams understand and modernise legacy logic.",
            },
            {
              title: "Ask",
              description:
                "Ask questions about an analysis and get answers grounded in its source code.",
            },
          ].map((feature) => (
            <article
              key={feature.title}
              className="flex flex-col gap-4 bg-background p-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                {feature.title}
              </span>
              <p className="text-sm leading-6 text-foreground/70">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-foreground/10 px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
              From source to understanding
            </span>

            <h2 className="max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
              Legacy code shouldn't require tribal knowledge.
            </h2>

            <p className="max-w-xl text-sm leading-7 text-foreground/60">
              UUU gives developers and teams a structured way to inspect
              unfamiliar systems, understand what they do, identify risk, and
              make informed decisions about what comes next.
            </p>
          </div>

          <div className="border border-foreground/10 bg-foreground/5 p-6">
            <div className="flex flex-col gap-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
                <span className="text-foreground/40">SOURCE</span>
                <span>COBOL</span>
              </div>

              <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
                <span className="text-foreground/40">ANALYSIS</span>
                <span className="text-green-600">COMPLETE</span>
              </div>

              <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
                <span className="text-foreground/40">RISK</span>
                <span className="text-red-500">HIGH</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-foreground/40">PYTHON</span>
                <span>GENERATED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
            Start understanding
          </span>

          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Make your legacy systems easier to reason about.
          </h2>

          <p className="max-w-xl text-sm leading-6 text-foreground/60">
            Analyse your first piece of code and see what UUU can uncover.
          </p>

          <Link
            to="/analyse"
            className="bg-plum px-5 py-3 text-sm font-medium text-background
              hover:bg-plum/90"
          >
            Get started
          </Link>
        </div>
      </section>
    </main>
  );
}
