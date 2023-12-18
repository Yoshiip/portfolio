<script>
// @ts-nocheck


import projects from '$lib/projects.json';
import ProjectModal from './ProjectModal.svelte'

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

<title>Projets • Tourneur Aymeri</title>
<main class:scroll-lock={disabledScroll}>
    <h1>Projets</h1>
    <div class="projects_container" id="projects">
        {#each projects as project, i}
            <button class="project" on:click={() => showProject(i)} style="background-image: url('{project.images[0]}')">
                <div class="label"><span>{project.name}</span></div>
            </button>
        {/each}
    </div>


</main>

{#if modal_visible}
    <ProjectModal closeProjectModal={closeModal} projectId={projectId}/>
{/if}

<style>
    @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");


main {
  margin-top: 80px;
  text-align: center;
}

h1 {
    font-size: 3em;
}

.scroll-lock {
  overflow-y: hidden;
}

.projects_container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding-top: 64px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 100px;
}

.project {
  width: calc(33svw - 32px);;
  height: 200px;
  position: relative;
  border: 2px solid rgb(224, 224, 224);

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  border-radius: 10px;
  cursor: pointer;

  align-self: center;
  justify-self: center;
  transition: 0.15s ease;
}

@media screen and (max-width: 1024px) {
  .projects_container {
    grid-template-columns: repeat(2, 1fr);
  }

  .project {
    width: calc(50svw - 32px);
  }
}

@media screen and (max-width: 640px) {
  .projects_container {
    grid-template-columns: 1fr;
    padding: 0;
  }

  .project {
    width: calc(100svw - 64px);
  }
}

.project:hover {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
}

.project > .label {

  bottom: 8px;
  position: absolute;
  width: 100%;

  
  display: flex;
  align-items: center;
  justify-content: center;
}

.project > .label > span {
  color: black;
  background-color: white;
  border-radius: 48px;
  padding: 6px;
  font-size: 18px;
  font-weight: 700;
  font-family: 'Space Mono', monospace;
}
</style>