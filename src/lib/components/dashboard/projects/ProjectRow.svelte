<script lang="ts">
    import { pb } from "$lib/pocketbase";
    import { onMount } from "svelte";
    import type {
        ImagesResponse,
        ProjectsResponse,
        SkillsResponse,
    } from "../../../../types/pocketbase-types";

    export let project: ProjectsResponse;
    export let showImageFullscreenModal: (imageId: string) => void;
    export let editProject: (projectId: string) => void;
    export let deleteProject: (projectId: string) => void;

    let skills: any;
    let images: any;
    let date = new Date(project.date).toISOString().split("T")[0];

    onMount(() => {
        if (!project.expand) return;
        skills = project.expand.skills;
        images = project.expand.images;
    });
</script>

<tr>
    <th>
        <label>
            <input type="checkbox" class="checkbox" />
        </label>
    </th>
    <td>
        {#if project.logo !== ""}
            <img
                src={pb.files.getUrl(project, project.logo)}
                alt={project.name}
                class="h-6"
            />
        {:else}
            {project.name}
        {/if}
    </td>
    <td>
        {#await skills}
            {#each project.skills as skill, index}
                <div class="badge">
                    <img
                        alt={skills[index].name}
                        src={pb.files.getUrl(
                            skills[index],
                            skills[index].image,
                            {
                                thumb: "16x16",
                            },
                        )}
                        class="size-5 mr-1 rounded-full"
                    />
                    {skills[index].name}
                </div>
            {/each}
        {/await}
    </td>
    <td>
        {#each project.images as image, index}
            <img
                src={pb.files.getUrl(images[index], images[index].image, {
                    thumb: "128x128",
                })}
                on:click={() => showImageFullscreenModal(images[index].id)}
                alt={images[index].alt}
                class="size-8 rounded cursor-zoom-in"
            />
        {/each}
    </td>
    <td>
        <input class="input input-ghost" type="date" value={date} />
    </td>
    <td>
        <button
            on:click={() => editProject(project.id)}
            class="btn btn-ghost btn-xs">Modifier</button
        >
        <button
            on:click={() => deleteProject(project.id)}
            class="btn btn-ghost btn-xs">Suppprimer</button
        >
    </td>
</tr>
