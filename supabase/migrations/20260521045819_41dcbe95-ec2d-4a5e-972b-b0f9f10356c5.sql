
CREATE TABLE public.prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read prompts"
  ON public.prompts FOR SELECT
  USING (true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('prompt-images', 'prompt-images', true);

CREATE POLICY "Public can view prompt images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'prompt-images');
