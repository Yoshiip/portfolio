<script lang="ts">
  import { self } from "svelte/legacy";

  import { pb } from "$db/pocketbase";
  import { SearchX } from "lucide-svelte";
  import { projectsTypeName } from "../../stores/utils";
  import type { ImagesResponse, SkillsResponse } from "$db/pocketbase-types";
  import { type ProjectsResponseExtended } from "$db/pb-extended-types";
  import { onMount } from "svelte";
  import { closeModal, openModal } from "$lib/modals.svelte";

  let currentSkill = $state<SkillsResponse>();
  let projects: ProjectsResponseExtended[] = $state([]);
  let images: ImagesResponse[] = [];
  let modal = $state<HTMLDialogElement>();

  let {
    id,
    data,
  }: {
    id: string;
    data: {
      skill: SkillsResponse;
    };
  } = $props();

  onMount(() => {
    currentSkill = data.skill;
    pb.collection<ProjectsResponseExtended>("projects")
      .getFullList({
        filter: `skills ~ "${currentSkill.id}"`,
        expand: "images, skills",
        sort: "-date",
      })
      .then((response) => {
        projects = response;
        images = projects.flatMap((p) => p.expand?.images ?? []);
      });
    if (modal) {
      modal.showModal();
      modal.scrollTop = 0;
    }
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
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={modal}
  onkeydown={keyDown}
  onclick={self(close)}
  class="modal flex items-center justify-center gap-8"
>
  <div class="modal-box w-11/12 max-w-4xl">
    <button
      class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
      onclick={close}>✕</button
    >
    {#if currentSkill}
      <div class="flex gap-4 flex-col lg:flex-row">
        <div class="card bg-gray-950 min-w-80 lg:max-w-80 lg:min-h-[640px]">
          <div class="card-body">
            <img
              class="w-full max-w-12"
              src={pb.files.getURL(currentSkill, currentSkill.image)}
              alt="{currentSkill.name} logo"
            />
            <h2 class="card-title text-gray-50">
              {currentSkill.name}
            </h2>
            <p class="text-gray-200">
              {@html currentSkill.description}
            </p>
          </div>
        </div>
        <div class="md:overflow-y-auto md:max-h-[640px]">
          <h2
            class="text-2xl font-bold text-slate-700 dark:text-gray-300 mt-6 mb-3"
          >
            Projet{projects.length !== 1 ? "s" : ""}
            utilisant
            <img
              alt={currentSkill.name}
              src={pb.files.getURL(currentSkill, currentSkill.image)}
              class="size-6 inline-block"
            />
            <span class="text-primary">
              {currentSkill.name}
            </span>
          </h2>
          {#if projects.length === 0}
            <div
              class="flex items-center justify-center flex-col gap-2 text-gray-500"
            >
              <SearchX class="size-8" />
              <p>
                J'ai utilisé cette technologie dans aucun projet public.
                Néanmoins, je l'ai très probablement utilisée lors de stages en
                entreprise, et je ne peux pas les lister ici pour des raisons de
                confidentialité.
              </p>
            </div>
          {:else}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {#each projects as project, i (project.id)}
                {@const images = project.expand?.images ?? []}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div
                  class="card card-compact bg-base-100 shadow-xl active:scale-95 transition-all cursor-pointer hover:-translate-y-2 hover:shadow-2xl"
                  onclick={() => () => {
                    console.log(i);
                    console.log(projects);
                    openModal("ProjectModal", {
                      projects,
                      index: i,
                    });
                  }}
                >
                  {#if images.length > 0}
                    <figure>
                      <img
                        src={pb.files.getURL(images[0], images[0].image)}
                        alt="{project.name} image"
                      />
                    </figure>
                  {/if}
                  <div class="card-body">
                    <h2 class="card-title">
                      {project.name}
                      <div class="badge badge-ghost">
                        {projectsTypeName[project.type]}
                      </div>
                    </h2>
                    <p class="line-clamp-2 text-gray-600">
                      {@html project.description}
                    </p>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</dialog>
