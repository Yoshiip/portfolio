<script lang="ts">
    import type {
        ImagesResponse,
        ProjectsResponse,
        SkillsResponse,
    } from "../../types/pocketbase-types";
    import {
        ArrowLeft,
        ArrowRight,
        ExternalLink,
        Github,
        Share,
    } from "lucide-svelte";
    import SkillCard from "./SkillCard.svelte";
    import { pb } from "$lib/pocketbase";
    import { camelToTitleCase, mod } from "../../stores/utils";
    import Carousel from "./Carousel.svelte";
    import SkillDetailModal from "./SkillDetailModal.svelte";

    let currentProject: ProjectsResponse;
    let skills: SkillsResponse[] = [];
    let images: ImagesResponse[] = [];
    let modal: HTMLDialogElement;

    export const showModal = (project: ProjectsResponse) => {
        closeSkillDetailModal();
        currentProject = project;
        if (project.expand) {
            skills =
                project.expand?.skills ??
                (project.expand?.skills as SkillsResponse[]) ??
                [];
            images =
                project.expand?.images ??
                (project.expand?.images as ImagesResponse[]) ??
                [];
        }
        modal.showModal();
    };

    function closeModal() {
        modal.close();
    }

    function keyDown(e: KeyboardEvent) {
        switch (e.code) {
            case "Escape":
                closeModal();
        }
    }

    let closeSkillDetailModal: () => void;
    let showSkillDetailModal: (skill: SkillsResponse) => void;
    export let showNavigationArrows: boolean = true;
    export let showPreviousProject: () => void = () => {};
    export let showNextProject: () => void = () => {};
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={modal}
    on:keydown={keyDown}
    on:click|self={closeModal}
    class="modal flex items-center justify-center gap-8"
>
    {#if currentProject}
        {#if showNavigationArrows}
            <div class="tooltip hidden md:block" data-tip="Projet précedent">
                <button class="btn btn-circle" on:click={showPreviousProject}>
                    <ArrowLeft />
                </button>
            </div>
        {/if}
        <div class="modal-box w-11/12 max-w-3xl">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                on:click={closeModal}>✕</button
            >
            <div class="w-full flex flex-col gap-4 items-center justify-center">
                {#if currentProject.logo !== ""}
                    <img
                        src={pb.files.getUrl(
                            currentProject,
                            currentProject.logo,
                        )}
                        alt="{currentProject.name} logo"
                        class="m-auto max-h-16"
                    />
                {:else}
                    <h1
                        class="text-4xl text-gray-600 font-bold dark:text-gray-200"
                    >
                        {currentProject.name}
                    </h1>
                {/if}
                <div class="flex gap-4">
                    {#if currentProject.type}
                        <span class="badge badge-lg badge-primary"
                            >{camelToTitleCase(currentProject.type)}</span
                        >
                    {/if}
                    {#if currentProject.date}
                        <div
                            class="tooltip"
                            data-tip={new Date(
                                currentProject.date,
                            ).toLocaleDateString()}
                        >
                            <div class="badge badge-neutral badge-lg">
                                {currentProject.date.split("-")[0]}
                            </div>
                        </div>
                    {/if}
                </div>
            </div>

            <div class="mt-16"></div>

            {#if images.length > 0}
                <Carousel {images} />
            {/if}

            {#if currentProject.description}
                <h2
                    class="text-2xl text-slate-700 dark:text-gray-300 font-bold mt-6 mb-3"
                >
                    Description
                </h2>

                <p class="text-justify">
                    {@html currentProject.description}
                </p>
            {/if}

            {#if skills.length > 0}
                <h2
                    class="text-2xl text-slate-700 dark:text-gray-300 font-bold mt-6 mb-3"
                >
                    Technologies
                </h2>
                <div class="grid grid-cols-4 gap-4">
                    {#each skills as skill}
                        <SkillCard
                            {skill}
                            onClick={() => showSkillDetailModal(skill)}
                        />
                    {/each}
                </div>
            {/if}
            {#if currentProject.url || currentProject.git_url}
                <h2
                    class="text-slate-700 dark:text-gray-300 font-bold text-2xl mt-6 mb-3"
                >
                    Liens
                </h2>
            {/if}
            {#if currentProject.url}
                <a
                    href={currentProject.url}
                    class="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ExternalLink class="size-4 me-2" />
                    Accéder
                </a>
            {/if}
            {#if currentProject.git_url}
                <a
                    href={currentProject.git_url}
                    class="btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    ><Github />
                    Code source
                </a>
            {/if}
        </div>
        {#if showNavigationArrows}
            <div class="tooltip hidden md:block" data-tip="Projet suivant">
                <button class="btn btn-circle" on:click={showNextProject}>
                    <ArrowRight />
                </button>
            </div>
        {/if}
    {/if}
</dialog>

<SkillDetailModal
    bind:showModal={showSkillDetailModal}
    showProjectModal={showModal}
    bind:closeModal={closeSkillDetailModal}
/>
