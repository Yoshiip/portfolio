

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.e7d8b3a6.js","_app/immutable/chunks/index.c46ace97.js","_app/immutable/chunks/index.af226eff.js"];
export const stylesheets = ["_app/immutable/assets/2.1ee6e084.css"];
export const fonts = [];
