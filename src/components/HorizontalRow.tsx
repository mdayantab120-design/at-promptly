import type { Prompt } from "@/data/prompts";

interface Props {
  title: string;
  items: Prompt[];
  onOpen: (p: Prompt) => void;
}

export function HorizontalRow({ title, items, onOpen }: Props) {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between px-4 sm:px-6 mb-3">
        <h2 className="font-display font-semibold text-lg tracking-tight">{title}</h2>
        <span className="text-xs text-muted-foreground">{items.length}</span>
      </div>
      <div className="flex gap-3 overflow-x-auto px-4 sm:px-6 pb-2 snap-x snap-mandatory scroll-smooth scrollbar-hide">
        {items.map((p) => (
          <button
            key={p.id}
            onClick={() => onOpen(p)}
            className="group relative shrink-0 snap-start w-36 sm:w-44 aspect-[3/4] rounded-2xl overflow-hidden border border-border/40 bg-card shadow-card transition-transform duration-300 active:scale-[0.97] hover:-translate-y-0.5 hover:shadow-glow"
          >
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.category}</div>
              <div className="text-sm font-semibold text-foreground line-clamp-1">{p.title}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}