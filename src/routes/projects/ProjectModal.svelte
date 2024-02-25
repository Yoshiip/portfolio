<script>
  // @ts-nocheck

  import {
    fade,
    blur,
    fly,
    slide,
    scale,
    draw,
    crossfade,
  } from "svelte/transition";
  import projects from "$lib/projects.json";
  import tools from "$lib/tools.json";

  export let projectId = 0;

  /**
   * @type {null}
   */
  export let closeProjectModal = null;

  /**
   * @param {string} property_label
   * @param {string} value
   */
  function add_formatted(property_label, value) {
    let data = [property_label, value];
    if (value.toLowerCase() in ICONS) {
      data.push(ICONS[value.toLowerCase()]);
    }
    return data;
  }

  const PROJECTS_TYPES = { game: "Jeu" };

  let carousel; // for calling methods of the carousel instance

  /**
   * @param {{ code: any; }} e
   */
  function keyDown(e) {
    console.log(e);
    switch (e.code) {
      case "Escape":
        closeProjectModal();
    }
  }

  /**
   * @param {number} delta
   */
  function offsetProjectId(delta) {
    projectId =
      (((projectId + delta) % projects.length) + projects.length) %
      projects.length;
  }
</script>

<svelte:window on:keydown={keyDown} />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="black_background" on:click|self={closeProjectModal} transition:fade>
  <div class="modal" transition:scale>
    <div class="content">
      <div class="project_info_list desktop">
        <h2>{projects[projectId].name}</h2>
        <div class="year">
          {projects[projectId].type} • {projects[projectId].date.split("-")[0]}
        </div>
        <ul>
          <li>
            <a href="#description">Description</a>
          </li>
          <li>
            <a href="#galerie">Galerie</a>
          </li>
          <li>
            <a href="#technologies">Technologies</a>
          </li>
          <li>
            <a href="#liens">Liens</a>
          </li>
        </ul>
      </div>
      <div class="modal_container">
        <div class="modal_header">
          <div class="name">
            {#if "logo" in projects[projectId]}
              <img
                src={projects[projectId].logo}
                alt="Project Logo"
                class="project_logo"
              />
            {:else}
              <h2>{projects[projectId].name}</h2>
            {/if}
          </div>
        </div>
        <h2 id="description">Description</h2>
        <p>{@html projects[projectId].description}</p>
        <h2 id="galerie">Galerie</h2>
        <div class="images">
          {#each projects[projectId].images as image_src}
            <img
              src={image_src}
              on:click={() => window.open(image_src, "_blank")}
              alt="Media"
            />
          {/each}
        </div>
        <h2 id="technologies">Technologies</h2>
        <div class="techno">
          {#each Object.keys(projects[projectId].tools) as tool}
            <div>
              {#if Object.hasOwn(tools, projects[projectId].tools[tool])}
                {#if Object.hasOwn(tools[projects[projectId].tools[tool]], "icon")}
                  <img
                    src={"/images/tools/" +
                      tools[projects[projectId].tools[tool]].icon}
                    alt=""
                    srcset=""
                  />
                {:else}
                  <img
                    src={"/images/tools/" +
                      projects[projectId].tools[tool] +
                      ".svg"}
                    alt=""
                    srcset=""
                  />
                {/if}
                <div class="label">{tool}</div>
                {#if Object.hasOwn(tools[projects[projectId].tools[tool]], "name")}
                  <span>{tools[projects[projectId].tools[tool]].name}</span>
                {:else}
                  <span>{projects[projectId].tools[tool]}</span>
                {/if}
              {:else}
                <span>Erreur!</span>
              {/if}
            </div>
          {/each}
        </div>
        <h2 id="liens">Liens</h2>
        <div class="buttons_container">
          <button
            class="button play_btn"
            on:click={() => open(projects[projectId].link)}
          >
            {projects[projectId].button_label}
            <img src="/images/icons/open.svg" alt="" srcset="" />
          </button>
          {#if projects[projectId].github_link}
            <button
              class="button github_btn"
              on:click={() => open(projects[projectId].github_link)}
              alt="Github"
              ><img
                alt="Github"
                src="/images/icons/github_black.png"
                width="24px"
              /></button
            >
          {/if}
        </div>
      </div>
    </div>
    <button class="close_btn" on:click={closeProjectModal}>
      <img src="/images/icons/close.svg" alt="Close" srcset="" />
    </button>
  </div>
  <div class="left_position arrow desktop" on:click={() => offsetProjectId(-1)}>
    <img src="/images/icons/right-arrow.png" alt="arrow icon" />
  </div>
  <div class="right_position arrow desktop" on:click={() => offsetProjectId(1)}>
    <img alt="Next project" src="/images/icons/right-arrow.png" />
  </div>
</div>

<style>
  .modal {
    width: 80%;
    height: 80%;
    background-color: #d9d9d9;
    border-radius: 12px;
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    position: relative;

    display: flex;
    flex-direction: column;
    font-family: "Inter", sans-serif;
    z-index: 1;
  }

  .black_background {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .project_info_list {
    background-color: #0f0f10;
    color: white;
    min-width: 320px;
    margin: 12px;
    border-radius: 12px;
    height: calc(100% - 24px);
  }

  .project_info_list li,
  ul,
  a {
    text-decoration: none;
    color: white;
    margin: 4px;
  }

  .project_info_list h2 {
    text-align: center;
    font-size: 24px;
    margin-top: 64px;
    margin-bottom: 0;
  }

  .project_info_list .year {
    text-align: center;
    color: lightgray;
  }

  .project_info_list > ul {
    margin: 8px;
    padding: 4px;
  }

  .project_info_list > ul > li {
    padding: 4px;
    font-weight: 100;
    margin: 0;
  }

  .project_info_list > ul > li:hover {
    padding: 4px;
    background-color: rgb(26, 26, 26);
    border-radius: 4px;
    list-style-type: none;
    font-weight: 100;
  }

  .modal_header {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .name {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 32px;
    padding-right: 32px;
    height: 64px;
    border-radius: 32px;
    margin-top: 64px;
    border: 2px solid rgba(0, 0, 255, 0.404);
    box-shadow: 0px 2px 16px 0px rgba(0, 0, 255, 0.486);
  }

  .name > h2 {
    font-size: 32px;
    color: #00f;
    font-weight: 900;
    margin: 0;
    padding: 0;
  }

  .content {
    margin: 0;
    padding: 0;
    display: inline-flex;
    height: 100%;
    width: 100%;
  }

  @media only screen and (max-width: 1024px) {
    .modal {
      width: 100%;
      height: 100%;
      border-radius: 0px;
    }

    .content {
      width: 100%;
    }

    .project_info_list {
      padding-bottom: 200px;
      position: initial;
      height: min-content;
      order: 3;
    }

    .close_btn {
      position: absolute;
      top: 32px;
      right: 32px;
    }
    .modal_header {
      padding-top: 96px;
    }
  }

  .close_btn {
    position: absolute;
    right: 32px;
    top: 64px;
    border: none;
    background: none;
    transform: translate(-50%, -50%);
    cursor: pointer;

    width: 56px;
    height: 56px;
    border-radius: 64px;
    background: white;
    z-index: 4;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close_btn > img {
    filter: invert();
    width: 48px;
    height: 48px;
  }

  .images {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 8px;
  }

  .images > img {
    border-radius: 10px;
    width: 320px;
  }

  .buttons_container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 96px;
  }

  .button {
    background-color: gray;
    color: white;
    width: 200px;
    height: 40px;
  }

  .play_btn {
    background-color: blue;
    border: none;
    position: relative;
    border-radius: 8px;
    color: white;
    width: 240px;
    margin-right: 20px;
    font-family: "Space Mono", monospace;
  }

  .play_btn > img {
    position: absolute;
    right: 4px;
    top: 4px;
  }

  .play_btn:hover {
    background-color: rgb(52, 52, 235);
  }

  .github_btn {
    width: 40px;
    border: none;
    border-radius: 8px;
    background-color: white;
  }

  .modal_container {
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
  }

  .modal_container > p {
    padding: 8px;
  }

  .project_logo {
    height: calc(100% - 16px);
  }

  .arrow {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .left_position {
    left: 20px;
  }

  .left_position > img {
    transform: scaleX(-1);
  }

  .right_position {
    right: 20px;
  }

  .techno {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 8px;
  }

  .techno > div {
    width: 200px;
    min-height: 96px;
    background-color: white;
    border-radius: 8px;
    padding: 8px;
    position: relative;
    animation: 0.1s;
  }

  .techno > div:hover {
    width: 200px;
    background-color: white;
    border-radius: 8px;
    position: relative;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .techno > div > img {
    width: 40px;
    max-height: 40px;
  }

  .techno > div > .label {
    color: gray;
  }
  .techno > div > span {
    font-size: 1.25em;
    font-weight: 900;
  }
</style>
