import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sparkles, Search, Loader2 } from "lucide-react";
import { Toaster } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Prompt } from "@/data/prompts";
import { PromptCard } from "@/components/PromptCard";
import { PromptModal } from "@/components/PromptModal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [active, setActive] = useState<Prompt | null>(null);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const { data: prompts = [], isLoading } = useQuery({
    queryKey: ["prompts"],
    queryFn: async (): Promise<Prompt[]> => {
      const { data, error } = await supabase
        .from("prompts")
        .select("id,title,category,prompt,image_url,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((r) => ({
        id: r.id,
        title: r.title,
        category: r.category,
        prompt: r.prompt,
        image: r.image_url,
      }));
    },
  });

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(prompts.map((p) => p.category)))],
    [prompts]
  );

  const filtered = useMemo(() => {
    return prompts.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [prompts, category, query]);

  return (
    <div className="min-h-screen">
      <Toaster theme="dark" position="top-center" />

      <header className="sticky top-0 z-30 glass border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-brand grid place-items-center shadow-glow">
              <Sparkles className="size-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">Promptly</span>
          </div>
          <div className="ml-auto relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search prompts…"
              className="w-full rounded-full bg-secondary/70 border border-border pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/60"
            />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-5 sm:pt-8 pb-3 text-center sm:text-left">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight animate-fade-up">
          Prompts that <span className="text-gradient">spark</span> imagination.
        </h1>
        <p className="mt-1.5 text-sm sm:text-base text-muted-foreground animate-fade-up" style={{ animationDelay: "80ms" }}>
          Tap any card, copy the prompt, create something new.
        </p>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide scroll-smooth snap-x">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`snap-start shrink-0 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-all border ${
                category === c
                  ? "bg-brand text-primary-foreground border-transparent shadow-glow"
                  : "bg-secondary/60 text-muted-foreground border-border hover:text-foreground hover:border-primary/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-3 sm:px-6 pb-20">
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">
            {prompts.length === 0 ? "No prompts yet. Add some from the admin page." : "No prompts match your search."}
          </p>
        ) : (
          <div className="columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-4">
            {filtered.map((p, i) => (
              <PromptCard key={p.id} prompt={p} index={i} onOpen={setActive} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border/40 py-8 text-center text-xs text-muted-foreground">
        Made with <span className="text-gradient font-semibold">Promptly</span> · Inspire & be inspired.
      </footer>

      <PromptModal prompt={active} onClose={() => setActive(null)} />
    </div>
  );
}
