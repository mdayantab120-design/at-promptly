import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const CreateInput = z.object({
  title: z.string().trim().min(1).max(120),
  category: z.string().trim().min(1).max(60),
  prompt: z.string().trim().min(1).max(4000),
  imageBase64: z.string().min(20),
  imageName: z.string().min(1).max(200),
  imageType: z.string().min(1).max(80),
});

export const createPrompt = createServerFn({ method: "POST" })
  .inputValidator((input) => CreateInput.parse(input))
  .handler(async ({ data }) => {
    const ext = (data.imageName.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const bytes = Uint8Array.from(atob(data.imageBase64), (c) => c.charCodeAt(0));

    const { error: upErr } = await supabaseAdmin.storage
      .from("prompt-images")
      .upload(path, bytes, { contentType: data.imageType, upsert: false });
    if (upErr) throw new Error(upErr.message);

    const { data: pub } = supabaseAdmin.storage.from("prompt-images").getPublicUrl(path);

    const { data: row, error } = await supabaseAdmin
      .from("prompts")
      .insert({
        title: data.title,
        category: data.category,
        prompt: data.prompt,
        image_url: pub.publicUrl,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });