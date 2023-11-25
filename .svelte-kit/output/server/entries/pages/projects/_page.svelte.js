import { c as create_ssr_component, e as escape, d as add_attribute, f as each, v as validate_component } from "../../../chunks/index.js";
const projects = [
  {
    name: "Portfolio",
    description: "C'est le portfolio que vous consultez actuellement! Je l'ai réalisé avec Svelte.",
    date: "2023-11-23",
    type: "website",
    tools: {
      Langage: "JavaScript",
      Framework: "Svelte",
      Illustrations: "Illustrator"
    },
    main_image: "/images/projects/portfolio/0.png",
    button_label: "Voir sur GitHub",
    github_link: "https://github.com/Yoshiip/portfolio",
    link: "https://ilyva.sciencesky.fr",
    color: "#0000ff"
  },
  {
    name: "Mecharia",
    description: "Un jeu réalisé à l'occasion de la GMTK Jam 2023. Il s'agit d'un jeu de Tower Defense dans lequel le joueur doit attaquer un jardin défendu automatiquement par des plantes. Le jeu présente des similitudes avec le gameplay de Plants vs. Zombies.",
    date: "2023-05-12",
    type: "game",
    tools: {
      Moteur: "Godot Engine",
      "Modélisation": "Blender",
      Illustrations: "Illustrator"
    },
    main_image: "/images/projects/mecharia/0.png",
    button_label: "Jouer",
    link: "https://yoshiip.itch.io/mecharia",
    logo: "/images/projects/mecharia/logo.png",
    color: "#ffc561"
  },
  {
    name: "Ilyva",
    main_image: "/images/projects/ilyva/2.jpg",
    left_image: "/images/projects/ilyva/0.jpg",
    right_image: "/images/projects/ilyva/1.jpg",
    description: "Un escape game original créé par des étudiants. Échappez-vous du monde parallèle dans lequel vous êtes bloqué(es) en vous exerçant à Bash.",
    button_label: "Jouer/Télécharger",
    date: "2023-01-9",
    type: "game",
    tools: {
      Moteur: "Godot Engine",
      "Modélisation": "Blender",
      Illustrations: "Illustrator",
      Montage: "Premiere Pro"
    },
    link: "https://ilyva.sciencesky.fr",
    github_link: "https://github.com/Yoshiip/ilyva",
    logo: "/images/projects/ilyva/logo.png",
    color: "#db281c"
  },
  {
    name: "Niptur's Curse",
    main_image: "/images/projects/niptur/0.png",
    left_image: "/images/projects/niptur/1.png",
    right_image: "/images/projects/niptur/2.png",
    description: "Niptur's Curse est un jeu issu d'une game jam nommée la Ludum Dare. Le concept est de fabriquer un jeu complet en moins de 72 heures, en partant de rien.<br>Ce jeu a été réalisé lors de la Ludum Dare 52, qui s'est déroulée du vendredi 6 janvier au lundi 9 janvier 2023.<br>Le but du jeu est d'explorer un monde infesté d'ennemis pour pousser des graines, permettant d'augmenter les caractéristiques de votre personnage ou de débloquer de nouvelles armes.<br>Le code, les graphismes et la musique du jeu ont été réalisés par moi-même.",
    button_label: "Jouer",
    date: "2023-01-9",
    type: "game",
    tools: {
      Moteur: "Godot Engine",
      Graphismes: "Aseprite",
      Musiques: "FL Studio"
    },
    link: "https://yoshiip.xyz/niptur/",
    logo: "/images/projects/niptur/logo.png",
    color: "#239063"
  },
  {
    name: "Kahorn",
    main_image: "/images/projects/kahorn/0.png",
    left_image: "/images/projects/kahorn/1.png",
    right_image: "/images/projects/kahorn/2.png",
    description: "Kahorn est un projet d'école s'inspirant fortement du jeu en ligne Kahoot. Kahorn se joue en multijoueur en ligne, pouvant être joué jusqu'à 32 joueurs. Le jeu utilise le protocole UDP pour transférer les données entre les utilisateurs (à l'aide de l'application ENet), et il possède un client et un serveur. Les questions sont récupérées depuis l'API TriviaDB, une API gratuite et simple d'utilisation permettant de récupérer des questions à choix multiples/vrai ou faux très facilement.",
    button_label: "Télécharger",
    date: "2022-04-14",
    type: "game",
    tools: {
      Moteur: "Godot Engine",
      "Réseau": "ENet",
      Illustrations: "Illustrator"
    },
    link: "https://yoshiip.xyz/kahorn",
    logo: "/images/projects/kahorn/logo.png",
    color: "#fa1a32"
  },
  {
    name: "LavaRun",
    main_image: "/images/projects/lavarun/0.png",
    left_image: "/images/projects/lavarun/1.png",
    description: "LavaRun est un jeu réalisé en IJava dans le cadre du BUT Informatique. C'est un jeu dans lequel vous devez vous échapper d'un labyrinthe (généré de manière procédurale à chaque partie) et éviter la lave en répondant correctement à des questions.",
    button_label: "Voir sur GitHub",
    date: "2023-01-08",
    type: "game",
    tools: {
      Langage: "Java"
    },
    link: "https://github.com/Yoshiip/LavaRun",
    color: "#BC1B1B"
  },
  {
    name: "Yoshtimer",
    main_image: "/images/projects/yoshtimer/1.jpg",
    left_image: "/images/projects/yoshtimer/0.png",
    description: "Yoshtimer est une application web dans laquelle on peut paramétrer un chronomètre Pomodoro hautement personnalisable et écouter de la musique d'une playlist relaxante directement sur l'application.",
    button_label: "Consulter",
    date: "2022-08-21",
    type: "website",
    tools: {
      Langage: "JavaScript",
      Framework: "Svelte"
    },
    link: "https://yoshiip.xyz/timer",
    color: "#AC4EC7"
  },
  {
    name: "Ultimate Hangman",
    main_image: "/images/projects/ultimate_hangman/0.png",
    left_image: "/images/projects/ultimate_hangman/1.png",
    right_image: "/images/projects/ultimate_hangman/2.png",
    description: "Ultimate Hangman est une version améliorée du jeu du pendu. Il comprend une interface graphique très ludique, des musiques, une carte du monde et un scénario. Le jeu permet de jouer en multijoueur local, laissant les joueurs deviner des mots entre eux.",
    logo: "/images/projects/ultimate_hangman/logo.png",
    button_label: "Jouer",
    date: "2021-01-23",
    type: "game",
    tools: {
      Moteur: "Godot Engine",
      Langage: "Python"
    },
    color: "#288bb6",
    link: "https://yoshiip.xyz/hangman"
  },
  {
    name: "Little Reactor",
    main_image: "/images/projects/little_reactor/0.png",
    left_image: "/images/projects/little_reactor/1.png",
    right_image: "/images/projects/little_reactor/2.png",
    logo: "/images/projects/little_reactor/logo.png",
    description: `"Little Reactor" est un jeu issu d'une game jam nommée la Ludum Dare. Le concept est de fabriquer un jeu complet en moins de 72 heures, en partant de rien.<br>Ce jeu a été réalisé lors de la Ludum Dare 49, qui s'est déroulée en octobre 2021.<br>Le but du jeu est d'empêcher des petits robots de tomber tout en respectant leur ordre pour progresser dans les niveaux.<br>Le code, les graphismes et la musique du jeu ont été réalisés par moi-même.`,
    button_label: "Jouer",
    date: "2021-10-11",
    type: "game",
    tools: {
      Moteur: "Godot Engine",
      "Musiques/SFX": "FL Studio",
      Graphismes: "Aseprite"
    },
    color: "#504c15",
    link: "https://yoshiip.xyz",
    github_link: "https://yoshiip.xyz"
  },
  {
    name: "Fall'em Down",
    main_image: "/images/projects/fall_em_down/0.png",
    left_image: "/images/projects/fall_em_down/1.png",
    right_image: "/images/projects/fall_em_down/2.png",
    description: "Fall'em Down est un jeu issu d'une game jam nommée la Ludum Dare. Le concept est de fabriquer un jeu complet en moins de 72 heures, en partant de rien.<br>Ce jeu a été réalisé lors de la Ludum Dare 48, qui s'est déroulée en avril 2021.<br>Le but du jeu est de tomber dans un puits en tuant les ennemis qui s'y dressent avec votre arme. Récupérez les gemmes pour améliorer votre personnage et tuez les trois boss pour gagner.<br>Le code et les graphismes du jeu ont été réalisés par moi-même.",
    button_label: "Jouer/Télécharger",
    date: "2021-04-13",
    color: "#6d2a09",
    logo: "/images/projects/fall_em_down/logo.png",
    type: "game",
    tools: {
      Moteur: "Godot Engine",
      "Musiques/SFX": "FL Studio",
      Graphismes: "Aseprite"
    },
    link: "https://yoshiip.xyz"
  }
];
function format_date(date) {
  var d = new Date(date);
  return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
}
const ProjectModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { projectId = 0 } = $$props;
  let { closeProjectModal = null } = $$props;
  function add_formatted(property_label, value) {
    var data = [property_label, value];
    if (value.toLowerCase() in ICONS) {
      data.push(ICONS[value.toLowerCase()]);
    }
    return data;
  }
  const ICONS = {
    "godot engine": "/images/icons/godot.svg",
    "python": "/images/icons/python.svg",
    "jeu": "/images/icons/video_game.png",
    "unity": "/images/icons/unity.png",
    "java": "/images/icons/java.svg",
    "svelte": "/images/icons/svelte.svg",
    "javascript": "/images/icons/javascript.png"
  };
  function format_project_info(project_data) {
    var data = [];
    if (project_data.name) {
      data.push(add_formatted("Nom", project_data.name));
    }
    if (project_data.date) {
      data.push(add_formatted("Date ", format_date(project_data.date)));
    }
    if (project_data.type) {
      data.push(add_formatted("Type de projet", project_data.type));
    }
    if (project_data.framework) {
      if (project_data.type === "tool") {
        data.push(add_formatted("Framework", project_data.framework));
      } else {
        data.push(add_formatted("Moteur", project_data.framework));
      }
    }
    if (project_data.tools) {
      for (let element in project_data.tools) {
        data.push(add_formatted(element, project_data.tools[element]));
      }
    }
    return data;
  }
  if ($$props.projectId === void 0 && $$bindings.projectId && projectId !== void 0)
    $$bindings.projectId(projectId);
  if ($$props.closeProjectModal === void 0 && $$bindings.closeProjectModal && closeProjectModal !== void 0)
    $$bindings.closeProjectModal(closeProjectModal);
  return `



<div class="black_background"><div class="modal"><div class="modal_header" style="${"background-color: " + escape(projects[projectId].color, true)}">${"logo" in projects[projectId] ? `<img${add_attribute("src", projects[projectId].logo, 0)} alt="Project Logo" class="project_logo">` : `<h2>${escape(projects[projectId].name)}</h2>`}

            <div class="left_position arrow mobile"><img src="/images/icons/right-arrow.png" alt="arrow icon">
                <span>Précedent</span></div>
            <div class="right_position arrow mobile"><img alt="Next project" src="/images/icons/right-arrow.png">
                <span>Suivant</span></div></div>
        <div class="content"><div class="project_info_list"><h2>À propos</h2>
                <ul>${each(format_project_info(projects[projectId]), (project, i) => {
    return `<li><span class="element_index">00${escape(i + 1)}</span>
                        <span class="label">${escape(project[0])}</span>
                        <span class="value">${project.length >= 3 ? `
                            <img alt="Brand logo"${add_attribute("src", project[2], 0)}>
                        ` : ``}${escape(project[1])}</span>
                    </li>`;
  })}</ul></div>
            <div class="modal_container"><div class="images">${"right_image" in projects[projectId] ? `<img alt="Project cover left"${add_attribute("src", projects[projectId].left_image, 0)} class="secondary">
                        <img alt="Project cover middle"${add_attribute("src", projects[projectId].main_image, 0)} class="primary">
                        <img alt="Project cover right"${add_attribute("src", projects[projectId].right_image, 0)} class="secondary">` : `${"left_image" in projects[projectId] ? `<img alt="Project cover left"${add_attribute("src", projects[projectId].left_image, 0)} class="primary">
                        <img alt="Project cover middle"${add_attribute("src", projects[projectId].main_image, 0)} class="primary">` : `<img alt="Project cover middle"${add_attribute("src", projects[projectId].main_image, 0)} class="primary">`}`}</div>
                <p><!-- HTML_TAG_START -->${projects[projectId].description}<!-- HTML_TAG_END --></p>
                <div class="buttons_container"><button class="button play_btn">${escape(projects[projectId].button_label)}
                        <img src="/images/icons/open.svg" alt="" srcset=""></button>
                    ${projects[projectId].github_link ? `<button class="button github_btn" alt="Github"><img alt="Github" src="/images/icons/github_black.png" width="24px"></button>` : ``}</div></div></div>
        <button class="close_btn"><img src="/images/icons/close.svg" alt="Close" srcset=""></button></div>
    <div class="left_position arrow desktop"><img src="/images/icons/right-arrow.png" alt="arrow icon">
        <span>Précedent</span></div>
    <div class="right_position arrow desktop"><img alt="Next project" src="/images/icons/right-arrow.png">
        <span>Suivant</span></div></div>`;
});
const ProjectAnimation_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "div.svelte-mxzmkl{z-index:-5}#spinning_text.svelte-mxzmkl{font-family:'Leentank';transform-origin:50% 50%;font-weight:700;font-size:54px;user-select:none}#spinning_text.svelte-mxzmkl:hover{cursor:pointer;fill:white;stroke:black}.circle1.svelte-mxzmkl{animation:svelte-mxzmkl-rotating 25s linear infinite}.circle2.svelte-mxzmkl{animation:svelte-mxzmkl-rotating 30s linear infinite;animation-direction:reverse}.circle3.svelte-mxzmkl{animation:svelte-mxzmkl-rotating 35s linear infinite}.circle4.svelte-mxzmkl{animation:svelte-mxzmkl-rotating 40s linear infinite;animation-direction:reverse}.circle5.svelte-mxzmkl{animation:svelte-mxzmkl-rotating 45s linear infinite}.circle6.svelte-mxzmkl{animation:svelte-mxzmkl-rotating 50s linear infinite;animation-direction:reverse}.circle7.svelte-mxzmkl{animation:svelte-mxzmkl-rotating 55s linear infinite}@keyframes svelte-mxzmkl-rotating{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
  map: null
};
const ProjectAnimation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showProject = (
    /** @type {number} */
    (id) => {
    }
  ) } = $$props;
  if ($$props.showProject === void 0 && $$bindings.showProject && showProject !== void 0)
    $$bindings.showProject(showProject);
  $$result.css.add(css$1);
  return `${``}`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "main.svelte-fqze96{overflow-y:auto}.scroll-lock.svelte-fqze96{overflow-y:hidden}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var projectId = 0;
  let modal_visible = false;
  let disabledScroll = false;
  function showProject(id) {
    modal_visible = true;
    projectId = id;
    disabledScroll = true;
  }
  function closeModal() {
    modal_visible = false;
    disabledScroll = false;
  }
  $$result.css.add(css);
  return `<link rel="stylesheet" href="css/modal.css">
<link rel="stylesheet" href="css/projects.css">
<title>Projets • Tourneur Aymeri</title>
<main class="${["svelte-fqze96", disabledScroll ? "scroll-lock" : ""].join(" ").trim()}"><header>${validate_component(ProjectAnimation, "ProjectAnimation").$$render($$result, { showProject }, {}, {})}
        <a href="/" class="back_button">Retour</a>
        <a href="#projects" class="scroll_button">Voir mes projets</a></header>
    <div class="projects_container" id="projects">${each(projects, (project, i) => {
    return `<button class="project" style="${"background-image: url('" + escape(project.main_image, true) + "')"}"><div class="label"><span>${escape(project.name)}</span></div>
        </button>`;
  })}</div></main>


${modal_visible ? `${validate_component(ProjectModal, "ProjectModal").$$render($$result, { closeProjectModal: closeModal, projectId }, {}, {})}` : ``}`;
});
export {
  Page as default
};
