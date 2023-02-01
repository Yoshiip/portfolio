<script>
import { fly } from 'svelte/transition';
import projects from './projects.json';
import ProjectModal from './ProjectModal.svelte'
import { onMount } from 'svelte';
import NavBar from '../../components/NavBar.svelte';

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


function showProject(id) {
    modal_visible = true;
    projectId = id
    disabledScroll = true;
    console.log(disabledScroll);
}

function closeModal() {
    modal_visible = false;
    disabledScroll = false;
}

let banner_parallax


function parallax(e) {
    let _w = 512;
    let _h = 320;
    let _mouseX = e.clientX;
    let _mouseY = e.clientY;
    let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
    let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
    let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
    let x = `${_depth3}, ${_depth2}, ${_depth1}`;
    banner_parallax.style.backgroundPosition = x;
}


</script>



<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/modal.css">
<title>Projets - Tourneur Aymeri</title>
{#if visible}
<body class:scroll-lock={disabledScroll}>
    <div class="projects_header" transition:fly>
        <img src="/images/work/projects_logo.png" alt="Project logo" class="logo">
        <!-- <div class="about_me_banner" bind:this={banner_parallax} on:mousemove={parallax}></div> -->
    </div>
    <div class="per_year_container">
        <h2>Par année</h2>
        <ul>
            <li><h2>2023</h2></li>
            <li>LavaRun</li>
            <li>LavaRun</li>
            <li>LavaRun</li>
            <li><h2>2022</h2></li>
            <li>LavaRun</li>
            <li>LavaRun</li>
            <li>LavaRun</li>
            <li><h2>2021</h2></li>
            <li>LavaRun</li>
            <li>LavaRun</li>
            <li>LavaRun</li>
        </ul>
    </div>
    <h1>Mes projets</h1>
    <p>Ici vous pouvez voir tout les projets que j'ai réalisé au cours de ma vie. Cliquez sur un projet pour voir plus d'informations le concernant!</p>
    <div class="projects_container">
        {#each projects as project, i}
        <button class="project" on:click={() => showProject(i)}>
            <img alt="Project cover" src={project.main_image}/>
            <div class="label"><span>{project.name}</span></div>
        </button>
        {/each}
    </div>
</body>
{/if}
<NavBar/>

{#if modal_visible}
    <ProjectModal closeProjectModal={closeModal} projectId={projectId}/>
{/if}



<style>
.scroll-lock {
    overflow-y: hidden;
}
</style>