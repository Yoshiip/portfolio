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
      <div class="tooltip hidden md:block" data-tip="Previous project">
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
          <h1 class="text-4xl text-gray-600 font-bold">
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
        <h2 class="text-2xl text-slate-700 font-bold mt-6 mb-3">Description</h2>

        <p class="text-justify">
          {@html project.description}
        </p>
      {/if}

      {#if project.expand.skills.length > 0}
        <h2 class="text-2xl text-slate-700 font-bold mt-6 mb-3">Tech stack</h2>
        <div class="grid grid-cols-4 gap-4">
          {#each project.expand.skills as skill}
            <SkillCard {skill} />
          {/each}
        </div>
      {/if}
      {#if project.url || project.git_url}
        <h2 class="text-slate-700 font-bold text-2xl mt-6 mb-3">Links</h2>
      {/if}
      {#if project.url}
        <a
          href={project.url}
          class="btn btn-primary"
          target="_blank"
          rel="noopener"
        >
          <ExternalLink class="size-4 me-2" />
          Visit
        </a>
      {/if}
      {#if project.git_url}
        <a href={project.git_url} class="btn" target="_blank" rel="noopener">
          <svg
            role="img"
            viewBox="0 0 24 24"
            class="size-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            ><title>GitHub</title><path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            /></svg
          >
          Source Code
        </a>
      {/if}
    </div>
    {#if data.projects.length > 1}
      <div class="tooltip hidden md:block" data-tip="Next project">
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
