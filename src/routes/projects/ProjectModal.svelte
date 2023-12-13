<script>
// @ts-nocheck

import { fade, scale  } from 'svelte/transition';
import projects from './projects.json';



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
const ICONS = {
    "godot engine": "/images/icons/godot.svg",
    "python": "/images/icons/python.svg",
    "jeu": "/images/icons/video_game.png",
    "unity": "/images/icons/unity.png",
    "java": "/images/icons/java.svg",
    "svelte": "/images/icons/svelte.svg",
    "javascript": "/images/icons/javascript.png",
}

let carousel; // for calling methods of the carousel instance


/**
     * @param {string | number | Date} date
     */
function format_date(date) {
    var d = new Date(date);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
}

/**
     * @param {{ name: string; type: string; date: string | number | Date; langage: string; framework: string; tools: string; }} project_data
     */
function format_project_info(project_data) {
    var project_types = {
        "game": "Jeu",
        "tool": "Outil",
        "website": "Site",
    };
    var data = [];
    if(project_data.name) {
        data.push(add_formatted("Nom", project_data.name));
    }
    if(project_data.date) {
        data.push(add_formatted("Date ", format_date(project_data.date)));
    }
    if(project_data.type) {
        data.push(add_formatted("Type de projet", project_data.type));
    }
    if(project_data.framework) {
        if(project_data.type === "tool") {
            data.push(add_formatted("Framework", project_data.framework))
        } else {
            data.push(add_formatted("Moteur", project_data.framework))
        }
    }
    if(project_data.tools) {
        for (let element in project_data.tools) {
            data.push(add_formatted(element, project_data.tools[element]))

        }
    }
        
    return data;
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
                <h2>{projects[projectId].name}</h2>
                <ul>
                    <li>Galerie</li>
                    <li>Description</li>
                    <li>Technologies</li>
                    <li>Liens</li>
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
                <h2>Description</h2>
                <p>{@html projects[projectId].description}</p>
                <h2>Galerie</h2>
                <div class="images" style="width: 640px;">
                    {#each projects[projectId].images as image_src}
                        <img src={image_src} alt="Media">
                    {/each}
                </div>
                <h2>Technologies</h2>
                <div class="techno">
                    {#each Object.keys(projects[projectId].tools) as tool}
                        <div>
                            {tool}
                            {projects[projectId].tools[tool]}
                        </div>
                    {/each}
                </div>
                <h2>Liens</h2>
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