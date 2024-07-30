<script lang="ts">
    import { pb } from "$lib/pocketbase";
    import { SearchX } from "lucide-svelte";
    import { projectsTypeName } from "../../stores/utils";
    import type {
        ImagesResponse,
        ProjectsResponse,
        SkillsResponse,
    } from "../../types/pocketbase-types";

    export let showProjectModal: (project: ProjectsResponse) => void;

    let currentSkill: SkillsResponse;
    let projects: ProjectsResponse[] = [];
    let images: ImagesResponse[] = [];
    let modal: HTMLDialogElement;

    export const showModal = (skill: SkillsResponse) => {
        currentSkill = skill;
        pb.collection("projects")
            .getFullList({
                filter: `skills ~ "${skill.id}"`,
                expand: "images, skills",
                sort: "-date",
            })
            .then((pr) => {
                projects = pr;
                images = projects.flatMap((p) => p.expand?.images ?? []);
            });
        modal.showModal();
        modal.scrollTop = 0;
    };

    export function closeModal() {
        modal.close();
    }

    function keyDown(e: KeyboardEvent) {
        switch (e.code) {
            case "Escape":
                closeModal();
        }
    }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={modal}
    on:keydown={keyDown}
    on:click|self={closeModal}
    class="modal flex items-center justify-center gap-8"
>
    <div class="modal-box w-11/12 max-w-4xl">
        <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            on:click={closeModal}>✕</button
        >
        {#if currentSkill}
            <div class="flex gap-4 flex-col lg:flex-row">
                <div
                    class="card bg-gray-950 min-w-80 lg:max-w-80 lg:min-h-[640px]"
                >
                    <div class="card-body">
                        <img
                            class="w-full max-w-12"
                            src={pb.files.getUrl(
                                currentSkill,
                                currentSkill.image,
                            )}
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
                            src={pb.files.getUrl(
                                currentSkill,
                                currentSkill.image,
                            )}
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
                                J'ai utilisé cette technologie dans aucun projet
                                public. Néanmoins, je l'ai très probablement
                                utilisée lors de stages en entreprise, et je ne
                                peux pas les lister ici pour des raisons de
                                confidentialité.
                            </p>
                        </div>
                    {:else}
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {#each projects as project}
                                {@const images = project.expand?.images ?? []}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div
                                    class="card card-compact bg-base-100 shadow-xl active:scale-90 transition-all cursor-pointer hover:-translate-y-2 hover:shadow-2xl"
                                    on:click={() => showProjectModal(project)}
                                >
                                    {#if images.length > 0}
                                        <figure>
                                            <img
                                                src={pb.files.getUrl(
                                                    images[0],
                                                    images[0].image,
                                                )}
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
