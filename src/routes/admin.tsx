import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Toaster, toast } from "sonner";
import { Loader2, Upload, Sparkles } from "lucide-react";
import { createPrompt } from "@/lib/prompts.functions";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

const CATEGORIES = [
  "Portrait", "Surreal", "Sci-Fi", "3D Render", "Fantasy",
  "Minimal", "Cityscape", "Abstract", "Concept Art", "Character",
  "Photography", "Instagram", "Trending",
];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      const s = String(r.result || "");
      resolve(s.split(",")[1] ?? "");
    };
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function AdminPage() {
  const qc = useQueryClient();
  const create = useServerFn(createPrompt);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("Please choose an image");
      const imageBase64 = await fileToBase64(file);
      return await create({
        data: {
          title, category, prompt,
          imageBase64,
          imageName: file.name,
          imageType: file.type || "image/jpeg",
        },
      });
    },
    onSuccess: () => {
      toast.success("Prompt published!");
      qc.invalidateQueries({ queryKey: ["prompts"] });
      setTitle(""); setPrompt(""); setFile(null); setPreview(null);
    },
    onError: (e: Error) => toast.error(e.message || "Failed to publish"),
  });

  const handleFile = (f: File | null) => {
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  return (
    <div className="min-h-screen">
      <Toaster theme="dark" position="top-center" />
      <header className="sticky top-0 z-30 glass border-b border-border/40">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center gap-2">
          <div className="size-8 rounded-xl bg-brand grid place-items-center shadow-glow">
            <Sparkles className="size-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">Admin</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 pb-20">
        <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
          Publish a <span className="text-gradient">new prompt</span>
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Upload an image, fill the details, and it appears on the homepage instantly.
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
          className="mt-6 space-y-5 rounded-3xl border border-border/60 bg-card p-5 sm:p-6 shadow-card"
        >
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Image</label>
            <label className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-secondary/40 hover:bg-secondary/70 transition-colors cursor-pointer p-6 text-center">
              {preview ? (
                <img src={preview} alt="preview" className="max-h-56 rounded-xl object-cover" />
              ) : (
                <>
                  <Upload className="size-6 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Tap to upload an image</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              placeholder="Neon Reverie"
              className="w-full rounded-xl bg-secondary/70 border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl bg-secondary/70 border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/60"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Prompt</label>
            <textarea
              required
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              maxLength={4000}
              rows={6}
              placeholder="Cinematic portrait of…"
              className="w-full rounded-xl bg-secondary/70 border border-border px-4 py-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring/60"
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand text-primary-foreground px-5 py-3 text-sm font-semibold shadow-glow hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {mutation.isPending && <Loader2 className="size-4 animate-spin" />}
            {mutation.isPending ? "Publishing…" : "Publish prompt"}
          </button>
        </form>
      </main>
    </div>
  );
}
