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
import p11 from "@/assets/p11.jpg";
import p12 from "@/assets/p12.jpg";
import p13 from "@/assets/p13.jpg";

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
  { id: "11", title: "Neon Eclipse", category: "Photography", image: p11,
    prompt: "Cinematic studio portrait of a young man with messy textured hair, wearing a black turtleneck, centered composition, dark minimal background, dramatic low-key lighting, a horizontal red neon light strip cutting across his eyes, strong contrast shadows covering lower face, intense gaze, moody atmosphere, cyberpunk aesthetic, ultra-realistic, sharp focus, 85mm lens, shallow depth of field, high detail, editorial photography style." },
  { id: "12", title: "Doodle Dreams", category: "Instagram", image: p12,
    prompt: "USE A REAL FACE AS A REFERENCE PHOTO. Keep the original background same as the reference image. Warm soft lighting with subtle shadows. Add multiple mini 3D chibi versions of the character around the image while maintaining original facial features. Include different expressions and poses: jumping, waving, sitting relaxed, holding a drink, playful cute expressions. Add white doodle elements including stars, hearts, sparkles, motion lines, cute icons and white outline around the main body. Add aesthetic handwritten text like \"SHINE\", \"BRIGHT DAY\", \"HAPPY\", \"SMILE\". Style should be clean aesthetic composition, soft pastel tones, glossy 3D chibi style, cute Korean Instagram aesthetic, high detail, sticker outline effect, instagrammable look, 4:5 aspect ratio." },
  { id: "13", title: "Echo", category: "Trending", image: p13,
    prompt: "cinematic streetwear editorial poster. Keep my face, body, pose, outfit, and original background recognizable, but enhance everything into a luxury fashion campaign aesthetic. Add 4 realistic duplicate versions of me across the frame placed naturally like motion-captured walk sequences. Keep the main/front version largest, sharpest, and most detailed, while side clones are slightly faded or motion blurred. Use dramatic overhead lighting with a subtle glow, deep shadows, long floor shadows, cool-toned cinematic color grading, strong contrast, glossy highlights, and soft film grain. Make the outfit textures crisp and premium. Add bold oversized magazine-style typography in the top corner with one powerful word related to movement or style: \"ECHO\". Include smaller minimal text such as collection year, slogan, barcode, or campaign details. Do not change face." },
];
