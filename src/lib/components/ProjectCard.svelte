<script lang="ts">
  import { pb } from "$db/pocketbase";
  import { type Snippet } from "svelte";
  import { projectsTypeName } from "../../stores/utils";
  import { type ProjectsResponseExtended } from "../db/pb-extended-types";

  let {
    project,
    cardClicked,
    icon,
  }: {
    project: ProjectsResponseExtended;
    cardClicked: () => void;
    icon?: Snippet;
  } = $props();
</script>

<button
  id="card"
  onclick={() => {
    cardClicked();
  }}
  class="card group shadow-sm bg-gray-950 h-80 flex flex-col items-center gap-2 hover:shadow-xl hover:bg-primary"
>
  {#if project.expand.images}
    {@const images = project.expand.images}
    <figure class="p-2">
      <img
        src={pb.files.getURL(images[0], images[0].image)}
        alt={project.name}
        class="rounded-md aspect-video object-cover"
      />
    </figure>
  {/if}
  <div class="w-full flex items-center justify-between px-4">
    <div class="flex flex-col">
      <span class="text-white font-mono font-bold block">{project.name}</span>
      <div class="badge badge-primary group-hover:badge-neutral flex gap-2">
        {@render icon?.()}
        {projectsTypeName[project.type]}
      </div>
    </div>
    <span
      class="shadow-md bg-gray-800 group-hover:bg-neutral p-2 rounded-full text-white font-bold flex gap-2"
    >
      {#if project.expand.skills}
        {@const skills = project.expand.skills}
        {#each skills as skill}
          {#if skill.master}
            <div class="tooltip" data-tip={skill.name}>
              <img
                alt="{skill.name} icon"
                src={pb.files.getURL(skill, skill.image)}
                class="size-5 object-fit"
              />
            </div>
          {/if}
        {/each}
      {/if}
    </span>
  </div>
</button>
