import { c as create_ssr_component, b as subscribe, d as add_classes } from "./index.js";
import { p as page } from "./stores.js";
const NavBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let page_name = $page.url.pathname.substr($page.url.pathname.lastIndexOf("/"));
  $$unsubscribe_page();
  return `<link rel="${"stylesheet"}" href="${"css/navbar.css"}">





<div class="${"navigation"}"><ul><li${add_classes((page_name === "/" ? "active" : "").trim())}><a href="${"/"}">Accueil</a></li>
        <li${add_classes((page_name === "/about" ? "active" : "").trim())}><a href="${"about"}">À propos</a></li>
        <li${add_classes((page_name === "/projects" ? "active" : "").trim())}><a href="${"projects"}">Projets</a></li>
        <li${add_classes((page_name === "/credits" ? "active" : "").trim())}><a href="${"credits"}">Crédits</a></li></ul></div>`;
});
export {
  NavBar as N
};
