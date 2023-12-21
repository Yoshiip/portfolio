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
    <img src="/images/projects/projects_header.jpg" alt="Projects" class="header">
    <div class="projects_container" id="projects">
        {#each projects as project, i}
            <button class="project" on:click={() => showProject(i)}>
              <img src="{project.images[0]}" alt="" class="cover">
                <div class="name">{project.name}</div>
                <div class="date">{project.date.split("-")[0]}</div>
            </button>
        {/each}
    </div>


</main>

{#if modal_visible}
    <ProjectModal closeProjectModal={closeModal} projectId={projectId}/>
{/if}

<style>
    @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");

    .header {
      width: calc(100% - 64px);
      border-radius: 16px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    }

main {
  margin-top: 80px;
  text-align: center;
}

.scroll-lock {
  overflow-y: hidden;
}

.projects_container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); 
  gap: 8px;
  padding-top: 64px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 100px;
}

.project {
  width: 320px;
  position: relative;
  border: none;

  border-radius: 8px;
  cursor: pointer;

  align-self: center;
  justify-self: center;
  transition: 0.15s ease;

  background-color: rgb(27, 28, 29);

  font-size: 16px;
}

.project > .cover {
  width: calc(100% - 16px);
  aspect-ratio: 16 / 9;
  margin-top: 8px;
}

.project > .name {
  color: white;
  text-align: left;
  margin: 8px;
  font-weight: 700;
  font-family: 'Space Mono', monospace;
}

.project > .date {
  position: absolute;
  right: 14px;
  bottom: 8px;
  background-color: blue;
  padding: 2px;
  border-radius: 4px;
  color: rgb(255, 255, 255);
  font-weight: 700;
  font-family: 'Space Mono', monospace;
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
</style>