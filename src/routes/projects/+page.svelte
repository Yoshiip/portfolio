<script>
// @ts-nocheck

import projects from '$lib/projects.json';
import ProjectModal from './ProjectModal.svelte'
import { onMount } from 'svelte';
import ProjectAnimation from '../../components/ProjectAnimation.svelte';

var projectId = 0;

let modal_visible = false;

let disabledScroll = false;


    /**
     * @param {number} id
     */
function showProject(id) {
    modal_visible = true;
    projectId = id
    disabledScroll = true;
}

function closeModal() {
    modal_visible = false;
    disabledScroll = false;
}

</script>


<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap" rel="stylesheet">

<link rel="stylesheet" href="css/modal.css">
<link rel="stylesheet" href="css/projects.css">
<title>Projets • Tourneur Aymeri</title>
<main class:scroll-lock={disabledScroll}>
    <header id="top">
        <a href="/" class="stylized_button back_button">
            <img src="/images/icons/back.svg" class="icon" alt="Back icon" srcset="">
            Retour
        </a>
        <a href="#projects" class="stylized_button scroll_button">
            <img src="/images/icons/arrow_downward.svg" alt="Scroll arrow" srcset="">
            Voir mes projets
        </a>
    </header>
    <h1>Projets</h1>
    <div class="projects_container" id="projects">
        {#each projects as project, i}
        <button class="project" on:click={() => showProject(i)} style="background-image: url('{project.images[0]}')">
            <div class="label"><span>{project.name}</span></div>
        </button>
        {/each}
    </div>

    <footer>
        <a href="#top" class="stylized_button">Revenir en haut</a>
        
        <div class="made_with">
            <span>Fait avec</span> <img src="/images/tools/svelte.svg" style="" alt="" srcset="" width="16"> <span>Svelte</span>
        </div>
    </footer>
</main>


{#if modal_visible}
    <ProjectModal closeProjectModal={closeModal} projectId={projectId}/>
{/if}



<style>
main {
    overflow-y: auto;
}

.scroll-lock {
    overflow-y: hidden;
}
</style>