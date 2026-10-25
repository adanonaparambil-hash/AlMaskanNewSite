# Hero film — generation prompts (Google Flow / Veo)

The homepage hero plays `public/assets/hero/village-film.mp4` over the poster `public/assets/hero/village-poster.webp`.
The site fades back to the poster just before the end of each loop, so **the clip must start on the poster frame**.

## Settings in Flow
- Mode: **Frames to Video** — upload the aerial render as the **first frame** *and* as the **last frame** (a perfect loop; the camera returns to where it started).
- Aspect ratio **16:9**, highest quality model available, **1080p** if offered (the current clip is 720p and looks soft on large screens), **8 s**.
- Generate 3–4 takes and pick the one with the smoothest, slowest camera.
- Download the MP4 and replace `public/assets/hero/village-film.mp4` (keep the name). Aim for ≤ 6 MB; if larger, compress (e.g. HandBrake, H.264, RF 23–25, "Web optimized").

## Prompt 1 — hero loop (recommended)
```
Cinematic aerial drone shot of a modern mixed-use residential village in the Omani desert, exactly as in the
reference image: white five-storey accommodation blocks around landscaped courtyards, a swimming pool, a green
football pitch, a white mosque with a slender minaret, rows of date palms lining the roads, golden sand all around.
The camera performs a very slow, smooth orbit to the right while gently pushing in, then eases back to the
starting position. Golden-hour sunlight, long soft palm shadows, warm sand tones, clear sky, light heat haze on
the horizon. Subtle life: a few cars moving slowly along the palm-lined roads, a white bus arriving at the gate,
small figures walking in the courtyards, palm fronds swaying in a light breeze, sparkle on the pool water.
Photorealistic architectural visualisation, high detail, sharp, stable, no camera shake, no cuts.
Ambient sound: soft desert wind, distant birdsong, faint traffic hum, a calm warm cinematic pad.
No text, no logos, no watermarks, no people close-up.
```

## Prompt 2 — dusk variant (optional second loop / social)
```
Same village and camera move as the reference image, at blue hour just after sunset: warm lights glowing in the
residential windows and walkways, floodlit green football pitch, softly lit mosque minaret, street lamps along the
palm-lined roads, deep blue sky fading to amber at the horizon. Very slow drone orbit, smooth and stable.
Photorealistic architectural visualisation. Ambient sound: evening breeze, distant call of birds, gentle cinematic
pad. No text, no logos, no watermarks.
```

## Prompt 3 — courtyard fly-through (optional, for a section or social reel)
```
Cinematic low drone glide into the landscaped residential courtyard of a modern Omani worker-accommodation village:
white residential blocks with balconies, palm trees, shaded seating, a basketball court and tennis courts, residents
walking and chatting, warm late-afternoon light. Slow forward dolly with a gentle rise at the end revealing the whole
village. Photorealistic, stable, no cuts. Ambient sound: footsteps, light conversation murmur, birds, soft breeze.
No text, no logos.
```

Note: the website plays the film **muted** (browsers block autoplay with sound); the audio is for social posts or a
full film with a "play with sound" button.
