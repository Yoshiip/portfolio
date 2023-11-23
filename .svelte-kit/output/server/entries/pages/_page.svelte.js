import { c as create_ssr_component, v as validate_component } from "../../chunks/index.js";
import { N as NavBar } from "../../chunks/NavBar.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<link rel="${"stylesheet"}" href="${"css/index.css"}">




<title>Tourneur Aymeri</title>

${``}

${validate_component(NavBar, "NavBar").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
