<script lang="ts">
  import { onMount } from "svelte";
  import { ProjectsTypeOptions } from "$db/pocketbase-types";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import { Search } from "lucide-svelte";
  import { projectsTypeIcons, projectsTypeName } from "$stores/utils";
  import ProjectYearButton from "$lib/components/ProjectYearButton.svelte";
  import type { ProjectsResponseExtended } from "$db/pb-extended-types";
  import { type PageData } from "./$types";
  import { openModal } from "$lib/modals.svelte";

  let filteredQuery: string = "";
  let filteredType: ProjectsTypeOptions | "" = "";

  let {
    data,
  }: {
    data: PageData;
  } = $props();
  onMount(() => {
    showedProjects = data.projects;

    updateFilters();
  });

  let cards = $state<Card[]>([]);

  let showedProjects: ProjectsResponseExtended[] = $state([]);

  function updateFilters() {
    showedProjects = data.projects;
    if (filteredType !== "")
      showedProjects = showedProjects.filter((p) => p.type === filteredType);
    if (filteredQuery !== "")
      showedProjects = showedProjects.filter((p) =>
        p.name.toLowerCase().includes(filteredQuery.toLowerCase())
      );

    cards = [];
    const listYears: string[] = [];
    showedProjects.forEach((project) => {
      const year = project.date.split("-")[0];
      if (!listYears.includes(year) && listYears.push(year)) {
        cards.push({
          type: "year",
          data: year,
        });
      }
      cards.push({
        type: "project",
        data: project,
      });
    });
  }

  function filterProjectByType(type: ProjectsTypeOptions | "") {
    filteredType = type;
    updateFilters();
  }

  function projectCardPressed(index: number) {
    openModal("ProjectModal", {
      projects: showedProjects,
      index,
    });
  }

  function filterProjectByName(query: string) {
    filteredQuery = query;
    updateFilters();
  }

  type Card = {
    type: "project" | "year";
    data: string | ProjectsResponseExtended;
  };
</script>

<Navbar />

<main class="max-w-7xl m-auto flex flex-col gap-4">
  <h1 class="text-6xl font-black text-center mt-32 mb-24">Projets</h1>
  <div
    class="flex flex-row items-center justify-center gap-4 p-2 bg-slate-900 rounded text-white"
  >
    <div>
      {showedProjects.length} projet{showedProjects.length === 1 ? "" : "s"}
    </div>
    <div class="text-slate-500 select-none">|</div>
    <span class="text-sm">Filtrer les projets</span>
    <div class="join border border-slate-700">
      <input
        class="btn join-item btn-neutral"
        onclick={() => filterProjectByType("")}
        type="radio"
        name="projectType"
        aria-label="Tous"
      />
      {#each Object.keys(ProjectsTypeOptions) as projectType}
        <input
          class="btn join-item btn-neutral"
          onclick={() =>
            filterProjectByType(projectType as ProjectsTypeOptions)}
          type="radio"
          name="projectType"
          aria-label={projectsTypeName[projectType]}
        />
      {/each}
    </div>
    <div class="flex-grow"></div>
    <label class="input input-ghost flex items-center p-2">
      <input
        type="text"
        placeholder="Rechercher un projet"
        class="grow"
        oninput={(e) => filterProjectByName((e.target as any).value)}
      />
      <Search class="text-gray-400" size="1rem" />
    </label>
  </div>
  <div class="grid gap-2 grid-cols-2 xl:grid-cols-3">
    {#each cards as card}
      {#if card.type === "project"}
        <ProjectCard
          cardClicked={() => {
            openModal("ProjectModal", {
              projects: showedProjects,
              index: showedProjects.indexOf(
                card.data as ProjectsResponseExtended
              ),
            });
          }}
          project={card.data as ProjectsResponseExtended}
        >
          {#snippet icon()}
            {@const SvelteComponent =
              projectsTypeIcons[(card.data as ProjectsResponseExtended).type]}

            <SvelteComponent class="size-4" />
          {/snippet}
        </ProjectCard>
      {:else}
        <ProjectYearButton
          year={card.data as string}
          projectsCount={showedProjects.filter(
            (p) => p.date.split("-")[0] === card.data
          ).length}
        />
      {/if}
    {/each}
  </div>
</main>
