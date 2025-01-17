<script lang="ts">
  import { self } from "svelte/legacy";

  import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-svelte";
  import SkillCard from "./SkillCard.svelte";
  import { pb } from "$db/pocketbase";
  import { camelToTitleCase, mod } from "$stores/utils";
  import Carousel from "./Carousel.svelte";
  import type { ProjectsResponseExtended } from "$db/pb-extended-types";
  import { onMount } from "svelte";
  import { closeModal } from "$lib/modals.svelte";

  let currentProjectIndex = $state(0);
  let modal = $state<HTMLDialogElement>();
  let project = $state<ProjectsResponseExtended>();

  let {
    id,
    data,
  }: {
    id: string;
    data: {
      index: number;
      projects: ProjectsResponseExtended[];
    };
  } = $props();

  onMount(() => {
    currentProjectIndex = data.index;
    changeProjectTo(currentProjectIndex);
    if (modal) modal.showModal();
  });

  function close() {
    closeModal(id);
  }

  function keyDown(e: KeyboardEvent) {
    switch (e.code) {
      case "Escape":
        close();
    }
  }

  function changeProjectTo(newIndex: number) {
    console.log(newIndex);
    if (newIndex < 0) newIndex += data.projects.length;
    newIndex = mod(newIndex, data.projects.length);
    currentProjectIndex = newIndex;
    project = data.projects[newIndex];
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={modal}
  onkeydown={keyDown}
  onclick={self(close)}
  class="modal flex items-center justify-center gap-8"
>
  {#if project}
    {#if data.projects.length > 1}
      <div class="tooltip hidden md:block" data-tip="Projet précedent">
        <button
          class="btn btn-circle"
          onclick={() => {
            changeProjectTo(currentProjectIndex - 1);
          }}
        >
          <ArrowLeft />
        </button>
      </div>
    {/if}
    <div class="modal-box w-11/12 max-w-3xl">
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onclick={close}>✕</button
      >
      <div class="w-full flex flex-col gap-4 items-center justify-center">
        {#if project.logo !== ""}
          <img
            src={pb.files.getURL(project, project.logo)}
            alt="{project.name} logo"
            class="m-auto max-h-16"
          />
        {:else}
          <h1 class="text-4xl text-gray-600 font-bold dark:text-gray-200">
            {project.name}
          </h1>
        {/if}
        <div class="flex gap-4">
          {#if project.type}
            <span class="badge badge-lg badge-primary"
              >{camelToTitleCase(project.type)}</span
            >
          {/if}
          {#if project.date}
            <div
              class="tooltip"
              data-tip={new Date(project.date).toLocaleDateString()}
            >
              <div class="badge badge-neutral badge-lg">
                {project.date.split("-")[0]}
              </div>
            </div>
          {/if}
        </div>
      </div>

      <div class="mt-16"></div>

      {#if project.expand.images.length > 0}
        <Carousel images={project.expand.images} />
      {/if}

      {#if project.description}
        <h2
          class="text-2xl text-slate-700 dark:text-gray-300 font-bold mt-6 mb-3"
        >
          Description
        </h2>

        <p class="text-justify">
          {@html project.description}
        </p>
      {/if}

      {#if project.expand.skills.length > 0}
        <h2
          class="text-2xl text-slate-700 dark:text-gray-300 font-bold mt-6 mb-3"
        >
          Technologies
        </h2>
        <div class="grid grid-cols-4 gap-4">
          {#each project.expand.skills as skill}
            <SkillCard {skill} />
          {/each}
        </div>
      {/if}
      {#if project.url || project.git_url}
        <h2
          class="text-slate-700 dark:text-gray-300 font-bold text-2xl mt-6 mb-3"
        >
          Liens
        </h2>
      {/if}
      {#if project.url}
        <a
          href={project.url}
          class="btn btn-primary"
          target="_blank"
          rel="noopener"
        >
          <ExternalLink class="size-4 me-2" />
          Accéder
        </a>
      {/if}
      {#if project.git_url}
        <a href={project.git_url} class="btn" target="_blank" rel="noopener "
          ><Github />
          Code source
        </a>
      {/if}
    </div>
    {#if data.projects.length > 1}
      <div class="tooltip hidden md:block" data-tip="Projet suivant">
        <button
          class="btn btn-circle"
          onclick={() => {
            changeProjectTo(currentProjectIndex + 1);
          }}
        >
          <ArrowRight />
        </button>
      </div>
    {/if}
  {/if}
</dialog>
