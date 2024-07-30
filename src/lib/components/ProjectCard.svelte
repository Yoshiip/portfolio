<script lang="ts">
    import type { ProjectsResponse } from "../../types/pocketbase-types";
    import { pb } from "$lib/pocketbase";
    import { onMount } from "svelte";
    import { projectsTypeName } from "../../stores/utils";
    export let project: ProjectsResponse;
    export let cardPressed: (index: number) => void;
    export let i: number;

    let images: any;
    let skills: any;

    $: project, setVar();

    function setVar() {
        images = project.expand?.images;
        skills = project.expand?.skills;
    }

    onMount(() => {
        setVar();
    });
</script>

<button
    on:click={() => cardPressed(i)}
    class="card group shadow bg-gray-950 h-80 flex flex-col items-center gap-2 hover:shadow-xl hover:bg-primary"
>
    {#if images}
        <figure class="p-2">
            <img
                src={pb.files.getUrl(images[0], images[0].image)}
                alt={project.name}
                class="rounded-md aspect-video object-cover"
            />
        </figure>
    {/if}
    <div class="w-full flex items-center justify-between px-4">
        <div class="flex flex-col">
            <span class="text-white font-mono font-bold block"
                >{project.name}</span
            >
            <div
                class="badge badge-primary group-hover:badge-neutral flex gap-2"
            >
                <slot name="icon"></slot>
                {projectsTypeName[project.type]}
            </div>
        </div>
        <span
            class="shadow-md bg-gray-800 group-hover:bg-neutral p-2 rounded-full text-white font-bold flex gap-2"
        >
            {#each skills as skill}
                {#if !skill.hidden}
                    <div class="tooltip" data-tip={skill.name}>
                        <img
                            src={pb.files.getUrl(skill, skill.image)}
                            class="size-5 object-fit"
                        />
                    </div>
                {/if}
            {/each}
        </span>
    </div>
</button>
