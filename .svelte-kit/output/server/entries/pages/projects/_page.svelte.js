import { c as create_ssr_component, v as validate_component } from "../../../chunks/index.js";
import { N as NavBar } from "../../../chunks/NavBar.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".scroll-lock.svelte-15v5p51{overflow-y:hidden}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<link rel="${"stylesheet"}" href="${"css/style.css"}">
<link rel="${"stylesheet"}" href="${"css/modal.css"}">
<title>Projets - Tourneur Aymeri</title>
${``}
${validate_component(NavBar, "NavBar").$$render($$result, {}, {}, {})}

${``}`;
});
export {
  Page as default
};
