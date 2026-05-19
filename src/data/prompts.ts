import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";
import p9 from "@/assets/p9.jpg";
import p10 from "@/assets/p10.jpg";

export type Prompt = {
  id: string;
  title: string;
  category: string;
  image: string;
  prompt: string;
};

export const prompts: Prompt[] = [
  { id: "1", title: "Neon Reverie", category: "Portrait", image: p1,
    prompt: "Cinematic portrait of a cyberpunk woman with neon lights reflecting on her face, shallow depth of field, ultra-detailed skin texture, magenta and cyan rim lighting, shot on Arri Alexa, 85mm lens, f/1.4, photorealistic." },
  { id: "2", title: "Floating Eden", category: "Surreal", image: p2,
    prompt: "A surreal floating island with cascading waterfalls drifting through cosmic space, dreamy purple sky with twin moons, lush vegetation, volumetric lighting, hyper-detailed digital painting, 8k." },
  { id: "3", title: "Mars Rider", category: "Sci-Fi", image: p3,
    prompt: "An astronaut riding a white horse across the Martian desert, vibrant orange dunes, painterly brushstrokes inspired by Norman Rockwell meets sci-fi concept art, golden hour light." },
  { id: "4", title: "Pocket Room", category: "3D Render", image: p4,
    prompt: "Tiny isometric cozy bedroom diorama, warm string lights, miniature furniture, soft global illumination, Blender Cycles render, vignette, photoreal materials, 4k." },
  { id: "5", title: "Dawn Wyrm", category: "Fantasy", image: p5,
    prompt: "Majestic dragon perched on a misty mountain peak at sunrise, leathery wings outstretched, atmospheric haze, epic fantasy art in the style of Greg Rutkowski, dramatic backlight." },
  { id: "6", title: "Sakura Stillness", category: "Minimal", image: p6,
    prompt: "A minimalist Japanese zen garden with cherry blossom tree, raked gravel, smooth pebbles, soft pastel pink and beige palette, gentle morning light, architectural photography." },
  { id: "7", title: "Rainy Tokyo", category: "Cityscape", image: p7,
    prompt: "Futuristic neon-lit Tokyo street at night in the rain, glowing kanji signage, wet asphalt reflections, cinematic anamorphic lens flares, moody Blade Runner aesthetic." },
  { id: "8", title: "Iridescent Flow", category: "Abstract", image: p8,
    prompt: "Abstract liquid metal sculpture with iridescent holographic colors swirling on a matte black background, ultra glossy, octane render, studio lighting, product photography." },
  { id: "9", title: "Cosmic Wolf", category: "Concept Art", image: p9,
    prompt: "A wolf made of stars and galaxy nebula, glowing constellation eyes, cosmic spirit animal, deep navy background scattered with stars, ethereal digital illustration." },
  { id: "10", title: "Bloom Bot", category: "Character", image: p10,
    prompt: "Cute 3D Pixar style robot character with oversized eyes holding a daisy, soft studio lighting, pastel background, subsurface scattering, octane render, 4k." },
];
