import { useEffect, useState } from "react";
import { Copy, Check, Download, X } from "lucide-react";
import { toast } from "sonner";
import type { Prompt } from "@/data/prompts";

interface Props {
  prompt: Prompt | null;
  onClose: () => void;
}

export function PromptModal({ prompt, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!prompt) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [prompt, onClose]);

  if (!prompt) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    toast.success("Prompt copied!");
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownload = async () => {
    try {
      const res = await fetch(prompt.image);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${prompt.title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Image downloaded");
    } catch {
      toast.error("Download failed");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/85 backdrop-blur-md animate-scale-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-3xl bg-card border border-border shadow-glow grid md:grid-cols-[1.4fr_1fr]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 inline-flex size-9 items-center justify-center rounded-full glass border border-border/60 text-foreground hover:bg-secondary transition-colors"
        >
          <X className="size-4" />
        </button>

        <div className="bg-background/40 flex items-center justify-center max-h-[65vh] md:max-h-[95vh] overflow-hidden">
          <img src={prompt.image} alt={prompt.title} className="w-full h-full object-contain" />
        </div>

        <div className="flex flex-col overflow-y-auto p-6 sm:p-8">
          <span className="self-start rounded-full bg-secondary px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {prompt.category}
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-display font-bold text-foreground">
            {prompt.title}
          </h2>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Prompt</div>
            <p className="text-sm leading-relaxed text-foreground/90 rounded-2xl bg-secondary/60 border border-border/60 p-4">
              {prompt.prompt}
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand text-primary-foreground px-5 py-3 text-sm font-semibold shadow-glow hover:opacity-90 transition-opacity"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy Prompt"}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              <Download className="size-4" />
              Download Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
