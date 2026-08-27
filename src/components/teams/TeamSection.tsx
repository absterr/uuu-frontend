interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function TeamSection({ title, description, children }: Props) {
  return (
    <section className="flex flex-col gap-4 border-b border-foreground/10 py-8 first:pt-0 last:border-0">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-medium text-foreground">{title}</h2>
        {description && (
          <p className="text-xs text-foreground/50">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
