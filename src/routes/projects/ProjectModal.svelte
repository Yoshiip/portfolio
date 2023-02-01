<script>
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
    if(value in ICONS) {
        data.push(ICONS[value]);
    }
    return data;
}

const PROJECTS_TYPES = {"game": "Jeu"}
const ICONS = {
    "Godot": "/images/icons/godot.svg",
    "GDScript": "/images/icons/godot.svg",
    "Python": "/images/icons/python.svg",
    "Jeu": "/images/icons/video_game.png",
    "Unity": "/images/icons/unity.png",
    "Java": "/images/icons/java.svg",
    "Svelte": "/images/icons/svelte.svg",
    "Javascript": "/images/icons/javascript.png",
}

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
    }
    var data = [
        add_formatted("Nom", project_data.name),
        add_formatted("Type de projet", project_types[project_data.type]),
        add_formatted("Date", format_date(project_data.date)),
        add_formatted("Language", project_data.langage),
    ]
    if(project_data.framework) {
        if(project_data.type === "tool") {
            data.push(add_formatted("Framework", project_data.framework))
        } else {
            data.push(add_formatted("Moteur", project_data.framework))
        }
    }
    if(project_data.tools) {
        data.push(add_formatted("Outils", project_data.tools))
    }
        
    return data;
}


function keyDown(e) {
    console.log(e);
    switch(e.code) {
        case "Escape":
            closeProjectModal();
        }
}



function offsetProjectId(delta) {
    projectId = ((projectId + delta) % projects.length + projects.length) % projects.length
}

</script>


<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

<svelte:window on:keydown={keyDown}/>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="black_background" on:click|self={closeProjectModal} transition:fade>
    <div class="left_position arrow" on:click={() => offsetProjectId(-1)}>
        <img src="/images/icons/right-arrow.png" alt="arrow icon">
        <span>Précedent</span>
    </div>
    <div class="modal" transition:scale>
        <div class="project_info_list">
            <h2>Game Info</h2>
            <ul>
                {#each format_project_info(projects[projectId]) as project, i}
                <li>
                    <span class="element_index">00{i + 1}</span>
                    <span class="label">{project[0]}</span>
                    <span class="value">{#if project.length >= 3}
                        <img alt="Brand logo" src={project[2]}>
                    {/if}{project[1]}</span>
                </li>
                {/each}
            </ul>
            <div class="buttons_container">
                <button class="button play_btn" on:click={() => open(projects[projectId].link)}>{projects[projectId].button_label}</button>
                {#if projects[projectId].github_link}
                <button class="button github_btn" on:click={() => open(projects[projectId].github_link)} alt="Github"><img alt="Github" src="/images/icons/github_black.png" width="24px"></button>
                {/if}
            </div>
        </div>
        <div class="modal_header" style="background-color: {projects[projectId].color}">
            {#if "logo" in projects[projectId]}
                <img src={projects[projectId].logo} class="project_logo">
            {:else}
                <h2>{projects[projectId].name}</h2>
            {/if}
        </div>
        <div class="modal_container">
            <!-- svelte-ignore a11y-missing-attribute -->
            <div class="images">
                {#if "right_image" in projects[projectId]}
                    <img alt="Project cover left" src={projects[projectId].left_image} class="secondary">
                    <img alt="Project cover middle" src={projects[projectId].main_image} class="primary">
                    <img alt="Project cover right" src={projects[projectId].right_image} class="secondary">
                {:else}
                    <img alt="Project cover left" src={projects[projectId].left_image} class="primary">
                    <img alt="Project cover middle" src={projects[projectId].main_image} class="primary">
                {/if}
            </div>
            <p>{@html projects[projectId].description}</p>
        </div>
        <button class="close_btn button" on:click={closeProjectModal}><span class="material-symbols-outlined">close</span></button>
    </div>
    <div class="right_position arrow" on:click={() => offsetProjectId(1)}>
        <img src="/images/icons/right-arrow.png">
        <span>Suivant</span>
    </div>
    
</div>