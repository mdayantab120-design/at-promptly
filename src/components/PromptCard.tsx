import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import type { Prompt } from "@/data/prompts";

interface Props {
  prompt: Prompt;
  index: number;
  onOpen: (p: Prompt) => void;
}

export function PromptCard({ prompt, index, onOpen }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    toast.success("Prompt copied!");
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <article
      onClick={() => onOpen(prompt)}
      className="group mb-5 break-inside-avoid cursor-pointer rounded-3xl bg-card shadow-card overflow-hidden border border-border/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow hover:border-primary/40 animate-fade-up"
      style={{ animationDelay: `${Math.min(index * 60, 600)}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={prompt.image}
          alt={prompt.title}
          loading="lazy"
          className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full glass border border-border/60 px-3 py-1.5 text-xs font-medium text-foreground translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand hover:text-primary-foreground hover:border-transparent"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy Prompt"}
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display font-semibold text-base leading-tight text-foreground">
            {prompt.title}
          </h3>
          <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {prompt.category}
          </span>
        </div>
      </div>
    </article>
  );
}
