<script>
// @ts-nocheck

import projects from './projects.json';
import ProjectModal from './ProjectModal.svelte'
import { onMount } from 'svelte';
import ProjectAnimation from '../../components/ProjectAnimation.svelte';

var projectId = 0;

let modal_visible = false;
let visible = false;

let disabledScroll = false;


onMount(()=>{
    requestAnimationFrame(()=>{
        setTimeout(()=>{
            visible = true
        }, 0)
    })
})


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



<link rel="stylesheet" href="css/modal.css">
<link rel="stylesheet" href="css/projects.css">
<title>Projets • Tourneur Aymeri</title>
<main class:scroll-lock={disabledScroll}>
    <header id="top">
        <ProjectAnimation showProject={showProject} />
        <a href="/" class="stylized_button back_button">
            <img src="/images/icons/back.svg" class="icon" alt="Back icon" srcset="">
            Retour
        </a>
        <a href="#projects" class="stylized_button scroll_button">
            <img src="/images/icons/arrow_downward.svg" alt="Scroll arrow" srcset="">
            Voir mes projets
        </a>
    </header>
    <div class="projects_container" id="projects">
        {#each projects as project, i}
        <button class="project" on:click={() => showProject(i)} style="background-image: url('{project.main_image}')">
            <div class="label"><span>{project.name}</span></div>
        </button>
        {/each}
    </div>

    <footer>
        <a href="#top" class="stylized_button">Revenir en haut</a>
        
        <div class="made_with">
            <span>Fait avec</span> <img src="/images/icons/svelte.svg" style="" alt="" srcset="" width="16"> <span>Svelte</span>
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