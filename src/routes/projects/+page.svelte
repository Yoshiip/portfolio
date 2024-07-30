<script lang="ts">
    import ProjectModal from "$lib/components/ProjectModal.svelte";
    import { onMount } from "svelte";
    import {
        ProjectsTypeOptions,
        type ProjectsResponse,
    } from "../../types/pocketbase-types";
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import { Search } from "lucide-svelte";
    import {
        camelToTitleCase,
        mod,
        projectsTypeIcons,
        projectsTypeName,
    } from "../../stores/utils";
    import ProjectYearButton from "$lib/components/ProjectYearButton.svelte";
    import { dark } from "../../stores/theme";

    let showModal: (project: ProjectsResponse) => void;

    let listYears: any[] = [];
    let filteredQuery: string = "";
    let filteredType: string = "";

    interface PageData {
        projects: ProjectsResponse[];
    }
    export let data: PageData;
    onMount(() => {
        projects = data.projects;
        showedProjects = projects;
    });

    let projects: ProjectsResponse[] = [];
    let showedProjects: ProjectsResponse[] = [];
    let currentProjectIndex: number = 0;

    function updateFilters() {
        listYears = [];
        showedProjects = projects;
        if (filteredType !== "")
            showedProjects = showedProjects.filter(
                (p) => p.type === filteredType,
            );
        if (filteredQuery !== "")
            showedProjects = showedProjects.filter((p) =>
                p.name.toLowerCase().includes(filteredQuery.toLowerCase()),
            );
    }

    function filterProjectByType(type: string) {
        filteredType = type;
        updateFilters();
    }

    function projectCardPressed(index: number) {
        currentProjectIndex = index;
        showModal(showedProjects[index]);
    }

    function showNextProject() {
        currentProjectIndex = (currentProjectIndex + 1) % showedProjects.length;
        showModal(showedProjects[currentProjectIndex]);
    }

    function showPreviousProject() {
        currentProjectIndex = mod(
            currentProjectIndex - 1,
            showedProjects.length,
        );
        showModal(showedProjects[currentProjectIndex]);
    }

    function filterProjectByName(query: string) {
        filteredQuery = query;
        updateFilters();
    }
</script>

<Navbar />

<div
    class="fixed inset-0 -z-10 h-full w-full bg-[#020617] bg-[linear-gradient(to_right,#0F1321_1px,transparent_1px),linear-gradient(to_bottom,#0F1321_1px,transparent_1px)] bg-[size:6rem_4rem]"
></div>
<div
    class:hidden={$dark}
    class="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"
></div>

<ProjectModal bind:showModal {showPreviousProject} {showNextProject} />

<main class="max-w-7xl m-auto flex flex-col gap-4">
    <h1 class="text-6xl font-black text-center mt-32 mb-24">Projets</h1>
    <div
        class="flex flex-row items-center justify-center gap-4 p-2 bg-slate-900 rounded text-white"
    >
        <div>{showedProjects.length} projets</div>
        <div class="text-slate-500 select-none">|</div>
        <span class="text-sm">Filtrer les projets</span>
        <div class="join border border-slate-700">
            <button
                class="btn join-item"
                class:btn-ghost={filteredType !== ""}
                on:click={() => filterProjectByType("")}>Tous</button
            >
            {#each Object.keys(ProjectsTypeOptions) as projectType}
                <button
                    class="btn join-item"
                    class:btn-ghost={filteredType !== projectType}
                    on:click={() => filterProjectByType(projectType)}
                >
                    <svelte:component this={projectsTypeIcons[projectType]} />
                    {projectsTypeName[projectType]}</button
                >
            {/each}
        </div>
        <div class="flex-grow"></div>
        <label class="input input-ghost flex items-center p-2">
            <input
                type="text"
                placeholder="Rechercher un projet"
                class="grow"
                on:input={(e) => filterProjectByName(e.target?.value)}
            />
            <Search class="text-gray-400" size="1rem" />
        </label>
    </div>
    <div class="grid gap-2 grid-cols-2 xl:grid-cols-3">
        {#each showedProjects as project, i}
            {@const year = project.date.split("-")[0]}
            {#if !listYears.includes(year) && listYears.push(year)}
                <ProjectYearButton
                    {year}
                    projectsCount={showedProjects.filter(
                        (p) => p.date.split("-")[0] === year,
                    ).length}
                />
            {/if}
            <ProjectCard
                i={showedProjects.indexOf(project)}
                {project}
                cardPressed={projectCardPressed}
            >
                <svelte:fragment slot="icon">
                    <svelte:component
                        this={projectsTypeIcons[project.type]}
                        class="size-4"
                    />
                </svelte:fragment>
            </ProjectCard>
        {/each}
    </div>
</main>
