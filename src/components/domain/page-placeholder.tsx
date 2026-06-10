type Props = {
  title: string;
  emoji: string;
  empty: string;
  phase: string;
};

// Placeholder de sección hasta que su fase la implemente. Sin estados vacíos
// en blanco (DESIGN.md).
export function PagePlaceholder({ title, emoji, empty, phase }: Props) {
  return (
    <div className="pt-4">
      <h1 className="font-display text-[22px] font-semibold">{title}</h1>
      <div className="mt-10 flex flex-col items-center gap-2 rounded-xl bg-surface px-6 py-12 text-center">
        <span className="text-[32px]">{emoji}</span>
        <p className="text-sm text-muted-foreground">{empty}</p>
        <span className="mt-2 rounded-full bg-brand-soft px-3 py-1 text-[11px] font-semibold text-brand">
          {phase}
        </span>
      </div>
    </div>
  );
}
