

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.4f322e6c.js","_app/immutable/chunks/index.c46ace97.js","_app/immutable/chunks/singletons.a4661b5d.js"];
export const stylesheets = [];
export const fonts = [];
