

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/projects/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.cc3ad733.js","_app/immutable/chunks/index.c46ace97.js","_app/immutable/chunks/index.af226eff.js"];
export const stylesheets = ["_app/immutable/assets/3.aa00072c.css"];
export const fonts = [];
