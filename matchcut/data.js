// MatchCut — tool database
// Verified against public sources as of August 2026.

export const TOOLS = {
  runway: {
    name: "Runway (Gen-4.5)", origin: "USA", flag: "🇺🇸", status: "active",
    price: "$$", priceDetail: "~$15/mo+", openSource: false, languages: "—", speed: "Moderate",
    categories: ["cinematic", "editing"],
    why: "Best editing control and camera control of any tool here — the safest production pick for teams that need precision, not just raw generation.",
    site: "runwayml.com"
  },
  veo: {
    name: "Google Flow (Veo 3.1)", origin: "USA", flag: "🇺🇸", status: "active",
    price: "$$", priceDetail: "Subscription", openSource: false, languages: "—", speed: "Moderate",
    categories: ["cinematic", "product"],
    why: "Best active tool for realistic marketing concepts and image-to-video workflows — stills and video live in one workspace.",
    site: "labs.google/flow"
  },
  sora: {
    name: "Sora 2 (OpenAI)", origin: "USA", flag: "🇺🇸", status: "discontinued",
    price: "—", priceDetail: "Discontinued", openSource: false, languages: "—", speed: "—",
    categories: ["cinematic"],
    why: "OpenAI discontinued the Sora web/app in April 2026, with the API following in September 2026. Listed for reference only — don't build a workflow around it.",
    site: null
  },
  luma: {
    name: "Luma AI (Ray3)", origin: "USA", flag: "🇺🇸", status: "active",
    price: "$", priceDetail: "~$10/mo", openSource: false, languages: "—", speed: "Fast (~10s/clip)",
    categories: ["cinematic", "product"],
    why: "The strongest motion physics and lighting realism here — the pick when a shot needs to look genuinely filmed, not generated.",
    site: "lumalabs.ai"
  },
  pika: {
    name: "Pika 2.5", origin: "USA", flag: "🇺🇸", status: "active",
    price: "$", priceDetail: "~$8/mo", openSource: false, languages: "—", speed: "Fast",
    categories: ["fast", "ugc"],
    why: "Fast, cheap, built for creative effects and quick social experiments rather than polished final output.",
    site: "pika.art"
  },
  heygen: {
    name: "HeyGen", origin: "USA", flag: "🇺🇸", status: "active",
    price: "$$", priceDetail: "~$24-29/mo", openSource: false, languages: "175+ languages", speed: "Moderate",
    categories: ["avatar", "multilingual"],
    why: "140+ realistic avatars and lip-sync in 175+ languages — the strongest pick for talking-head and multilingual spokesperson content.",
    site: "heygen.com"
  },
  synthesia: {
    name: "Synthesia", origin: "UK", flag: "🇬🇧", status: "active",
    price: "$$$", priceDetail: "$29/mo+", openSource: false, languages: "140+ languages", speed: "Moderate",
    categories: ["avatar"],
    why: "The standard for corporate training and internal communication video — polished, professional, built for business use rather than social content.",
    site: "synthesia.io"
  },
  higgsfield: {
    name: "Higgsfield AI", origin: "Global", flag: "🌐", status: "active",
    price: "$", priceDetail: "$5-$99/mo", openSource: false, languages: "—", speed: "Varies by model",
    categories: ["cinematic", "aggregator"],
    why: "Aggregates 15+ models (including Veo and Kling) with 70+ cinematic presets under one login — best when you want to compare models without five subscriptions.",
    site: "higgsfield.ai"
  },
  happyhorse: {
    name: "Happy Horse", origin: "Open-source", flag: "🧩", status: "active",
    price: "Free", priceDetail: "Open-source", openSource: true, languages: "Multilingual lip-sync", speed: "Very fast (~38s/clip)",
    categories: ["ugc", "multilingual", "budget"],
    why: "Open-source, no subscription, 1080p in ~38 seconds with multilingual lip-sync — the fastest and cheapest option here.",
    site: null
  },
  kling: {
    name: "Kling AI (3.0 Omni)", origin: "China", flag: "🇨🇳", status: "active",
    price: "$", priceDetail: "Strong free tier", openSource: false, languages: "5 languages", speed: "Fast",
    categories: ["cinematic", "avatar", "multilingual"],
    why: "Current leader for ultra-realism and native 4K, with dialogue lip-sync in 5 languages and clean in-video text rendering.",
    site: "klingai.com"
  },
  seedance: {
    name: "Seedance 2.5", origin: "China", flag: "🇨🇳", status: "active",
    price: "$", priceDetail: "Low cost", openSource: false, languages: "—", speed: "Moderate",
    categories: ["cinematic", "longform"],
    why: "Best subject coherence across scenes and native audio-video sync — built for reference-heavy, multi-shot narrative sequences.",
    site: null
  },
  hailuo: {
    name: "Hailuo AI (MiniMax)", origin: "China", flag: "🇨🇳", status: "active",
    price: "$", priceDetail: "Low cost", openSource: false, languages: "—", speed: "Fast",
    categories: ["fast", "ugc"],
    why: "Some of the most natural-looking motion of any fast tool — low barrier to entry, built for speed and social-ready output.",
    site: null
  },
  vidu: {
    name: "Vidu (Q2)", origin: "China", flag: "🇨🇳", status: "active",
    price: "$", priceDetail: "From $0.003/sec", openSource: false, languages: "—", speed: "Very fast (~10s/clip)",
    categories: ["fast", "budget"],
    why: "The fastest and cheapest tool here — a 4-second clip in 10 seconds, with convincing character microexpressions.",
    site: null
  },
  wan: {
    name: "Wan 2.6 (Alibaba)", origin: "China", flag: "🇨🇳", status: "active",
    price: "Free", priceDetail: "Open-source", openSource: true, languages: "—", speed: "Fast (~20s/clip)",
    categories: ["longform", "budget"],
    why: "Alibaba's open-source frontier model — roughly 20-second generation time, strong choice when you want free and fast.",
    site: null
  },
  cogvideox: {
    name: "CogVideoX (Zhipu AI)", origin: "China", flag: "🇨🇳", status: "active",
    price: "Free", priceDetail: "Open-source, self-hosted", openSource: true, languages: "—", speed: "Depends on hardware",
    categories: ["longform", "budget"],
    why: "Leading open-source, research-grade video model — free to run, best for technical users comfortable self-hosting.",
    site: null
  }
};

export const MATRIX = {
  product:      { primary: "luma",       alt: "veo" },
  cinematic:    { primary: "higgsfield", alt: "kling" },
  avatar:       { primary: "heygen",     alt: "kling" },
  ugc:          { primary: "hailuo",     alt: "pika" },
  multilingual: { primary: "heygen",     alt: "kling" },
  longform:     { primary: "seedance",   alt: "wan" }
};

export const PRIORITY_OVERRIDE = {
  speed:  { product: "vidu", cinematic: "hailuo", avatar: "kling", ugc: "vidu", multilingual: "happyhorse", longform: "wan" },
  budget: { product: "wan", cinematic: "higgsfield", avatar: "happyhorse", ugc: "vidu", multilingual: "happyhorse", longform: "cogvideox" }
};

export const PROMPTS = {
  product: (tool) => `[PRODUCT: describe your product here]\n\nOpening shot: slow push-in on the product, resting on [surface/setting], soft directional light from [left/right/above], shallow depth of field.\n\nMotion: camera orbits 20° around the product, revealing [key feature]. Natural reflections, no harsh shadows.\n\nClosing shot: product centered, light settles, brand logo/text fades in bottom third.\n\nStyle: photorealistic, commercial-grade lighting, 4K, 16:9.\n\n[Tool: ${tool}]`,
  cinematic: (tool) => `[BRAND: name] — [ONE-LINE STORY BEAT, e.g. "a founder's first day"]\n\nScene 1 (0-3s): wide establishing shot, [location], golden hour light, slow dolly-in.\nScene 2 (3-6s): close-up on [subject/detail], emotional beat — [what they feel].\nScene 3 (6-10s): reveal shot — product/brand moment, confident camera settle.\n\nTone: cinematic, warm color grade, subtle film grain, no dialogue — driven by music and visuals.\n\n[Tool: ${tool}]`,
  avatar: (tool) => `[CHARACTER: describe your avatar/spokesperson — age, look, outfit]\n\nSetting: [studio backdrop / office / outdoor], soft key light, camera at eye level, medium close-up.\n\nDialogue: "[insert script line 1]... [insert script line 2]..."\n\nDelivery: natural, conversational tone, subtle hand gestures, direct eye contact with camera.\n\nLip-sync: precise, [language].\n\n[Tool: ${tool}]`,
  ugc: (tool) => `[CREATOR: casual, handheld selfie-style framing]\n\nHook (0-2s): direct-to-camera, "[attention-grabbing opening line]"\n\nBody (2-8s): quick cuts between [product/topic] and reaction shots, natural lighting, slightly imperfect framing (feels authentic, not produced).\n\nCTA (8-10s): "[call to action line]"\n\nStyle: vertical 9:16, natural color, no heavy grade — this should feel like a phone video, not an ad.\n\n[Tool: ${tool}]`,
  multilingual: (tool) => `[SPEAKER: describe your character]\n\nScript (English): "[insert script]"\nTarget language(s): [list languages needed]\n\nDelivery: natural pacing, culturally appropriate tone for [target market], precise lip-sync per language track.\n\nSetting: [describe backdrop], consistent across all language versions.\n\n[Tool: ${tool}]`,
  longform: (tool) => `[STORY: one-paragraph synopsis]\n\nScene 1: [setting, characters, action] — establish world.\nScene 2: [rising action/conflict] — reference character consistency from Scene 1.\nScene 3: [turning point].\nScene 4: [resolution] — callback visual to Scene 1.\n\nCharacter reference: [upload 2-3 reference images/clips for consistency across scenes].\nAudio: [music mood / voiceover / ambient sound direction].\n\n[Tool: ${tool}]`
};
