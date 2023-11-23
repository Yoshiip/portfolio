import { c as create_ssr_component, v as validate_component } from "../../../chunks/index.js";
import { N as NavBar } from "../../../chunks/NavBar.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<link rel="${"stylesheet"}" href="${"css/style.css"}">
<title>Tourneur Aymeri</title>
<body><div class="${"about_me_header"}" id="${"parallax"}"><img src="${"/images/about_me/logo.png"}"></div>

    <div class="${"hello_world"}"><img src="${"/images/about_me/de_vinci.png"}"><br>Hello World.</div>
    <div class="${"container"}"><p>Je m&#39;appelle <b>Aymeri Tourneur</b>, et je suis un étudiant en B.U.T Informatique, à l&#39;université de Lille.<br>
        Je suis passioné par l&#39;informatique depuis mon jeune âge. Sur ce site, vous pouvez retrouver les divers projets que j&#39;ai pu réalisé en ayant sur la page <a href="${"projects"}">projets</a>.</p>
        <p>Je joue à des jeux-vidéos depuis que je suis petit, et aujourd&#39;hui je passe la plupart de mon temps à en concevoir.</p></div></body>
${validate_component(NavBar, "NavBar").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
