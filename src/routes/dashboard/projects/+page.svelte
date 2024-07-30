<script lang="ts">
    import ProjectModal from "$lib/components/dashboard/modals/ProjectModal.svelte";
    import ImageFullscreenModal from "$lib/components/dashboard/modals/ImageFullscreenModal.svelte";
    import { pb } from "$lib/pocketbase";
    import { onDestroy, onMount } from "svelte";
    import ProjectRow from "$lib/components/dashboard/projects/ProjectRow.svelte";
    import type { ProjectsResponse } from "../../../types/pocketbase-types";
    let showImageFullscreenModal: (imageId: string) => void;

    let showModal: (editingId: string) => void;

    let projects: ProjectsResponse[] = [];

    onMount(() => {
        pb.collection("skills").subscribe("*", (e) => {
            switch (e.action) {
                case "create":
                    projects.push(e.record as ProjectsResponse);
                    break;
                case "update":
                    const index = projects.findIndex(
                        (i) => i.id === e.record.id,
                    );
                    projects[index] = e.record as ProjectsResponse;
                    break;
                case "delete":
                    projects = projects.filter((i) => i.id !== e.record.id);
                    break;
            }
        });
        pb.collection("projects")
            .getFullList({
                expand: "skills,images",
            })
            .then((res) => {
                projects = res as ProjectsResponse[];
            });
    });

    onDestroy(() => {
        pb.collection("projects").unsubscribe();
    });

    function editProject(projectId: string) {
        showModal(projectId);
    }

    function deleteProject(projectId: string) {
        pb.collection("projects").delete(projectId);
    }
</script>

<h1 class="text-4xl font-bold mt-8 mb-4">Projets</h1>

<button class="btn btn-primary" on:click={() => showModal("")}
    >Créer un projet</button
>

<div class="overflow-x-auto">
    <table class="table">
        <thead>
            <tr>
                <th>
                    <label>
                        <input type="checkbox" class="checkbox" />
                    </label>
                </th>
                <th>Nom</th>
                <th>Compétences</th>
                <th>Images</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {#each projects as project}
                <ProjectRow
                    {editProject}
                    {deleteProject}
                    {project}
                    bind:showImageFullscreenModal
                />
            {/each}
        </tbody>
    </table>
</div>

<div
    class="absolute bottom-4 m-auto max-w-sm bg-base-100 rounded-full shadow-xl"
>
    Test
</div>

<ProjectModal bind:showModal />
<ImageFullscreenModal bind:showModal={showImageFullscreenModal} />
