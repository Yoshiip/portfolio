<script>
// @ts-nocheck

import { fade, scale  } from 'svelte/transition';
import projects from './projects.json';
import tools from './tools.json';



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
    var data = [property_label, value]
    if(value.toLowerCase() in ICONS) {
        data.push(ICONS[value.toLowerCase()]);
    }
    return data;
}

const PROJECTS_TYPES = {"game": "Jeu"}

let carousel; // for calling methods of the carousel instance


/**
     * @param {string | number | Date} date
     */
function format_date(date) {
    var d = new Date(date);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
}


    /**
     * @param {{ code: any; }} e
     */
function keyDown(e) {
    console.log(e);
    switch(e.code) {
        case "Escape":
            closeProjectModal();
        }
}



    /**
     * @param {number} delta
     */
function offsetProjectId(delta) {
    projectId = ((projectId + delta) % projects.length + projects.length) % projects.length
}

</script>


<!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" /> -->

<svelte:window on:keydown={keyDown}/>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="black_background" on:click|self={closeProjectModal} transition:fade>
    <div class="modal" transition:scale>
        <div class="content">
            <div class="project_info_list">
                <div class="info_top">
                    <img src={projects[projectId].images[0]} alt="">
                    <div>
                        <h2>{projects[projectId].name}</h2>
                    </div>
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
                            <img src={projects[projectId].logo} alt="Project Logo" class="project_logo">
                        {:else}
                            <h2>{projects[projectId].name}</h2>
                        {/if}
                    </div>
                </div>
                <h2 id="description">Description</h2>
                <p>{@html projects[projectId].description}</p>
                <h2 id="galerie">Galerie</h2>
                <div class="images" style="width: 640px;">
                    {#each projects[projectId].images as image_src}
                        <img src={image_src} on:click={() => window.open(image_src, '_blank')} alt="Media">
                    {/each}
                </div>
                <h2 id="technologies">Technologies</h2>
                <div class="techno">
                    {#each Object.keys(projects[projectId].tools) as tool}
                    <div>
                        {#if Object.hasOwn(tools, projects[projectId].tools[tool])}
                            {#if Object.hasOwn(tools[projects[projectId].tools[tool]], "icon")}
                                <img src={"/images/tools/" + tools[projects[projectId].tools[tool]].icon} alt="" srcset="">
                            {:else}
                                <img src={"/images/tools/" + projects[projectId].tools[tool] + ".svg"} alt="" srcset="">
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
                    <button class="button play_btn" on:click={() => open(projects[projectId].link)}>
                        {projects[projectId].button_label}
                        <img src="/images/icons/open.svg" alt="" srcset="">
                    </button>
                    {#if projects[projectId].github_link}
                        <button class="button github_btn" on:click={() => open(projects[projectId].github_link)} alt="Github"><img alt="Github" src="/images/icons/github_black.png" width="24px"></button>
                    {/if}
                </div>
            </div>
        </div>
        <button class="close_btn" on:click={closeProjectModal}>
            <img src="/images/icons/close.svg" alt="Close" srcset="">
        </button>
    </div>
    <div class="left_position arrow desktop" on:click={() => offsetProjectId(-1)}>
        <img src="/images/icons/right-arrow.png" alt="arrow icon">
    </div>
    <div class="right_position arrow desktop" on:click={() => offsetProjectId(1)}>
        <img alt="Next project" src="/images/icons/right-arrow.png">
    </div>
</div>