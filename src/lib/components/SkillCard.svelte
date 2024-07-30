<script lang="ts">
    import { pb } from "$lib/pocketbase";
    import { skillsTypeName } from "../../stores/utils";
    import type { SkillsResponse } from "../../types/pocketbase-types";

    export let skill: SkillsResponse;
    export const showDetails = false;
    export let onClick: () => void;

    let shadowColor = skill.master
        ? "shadow-md shadow-yellow-500/50 border border-yellow-200 dark:border-yellow-800 dark:shadow-yellow-800/50"
        : "shadow-md hover:shadow-xl";

    function onKeyPress(e: KeyboardEvent) {
        if (e.key === "Enter") onClick();
    }
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<div
    role="button"
    class="card bg-base-100 cursor-pointer w-full p-4 max-w-sm active:scale-90 hover:-translate-y-2 active:shadow-inner transition-all {shadowColor}"
    on:keypress={onKeyPress}
    on:click={onClick}
>
    <img
        src={pb.files.getUrl(skill, skill.image)}
        alt="{skill.name} logo"
        class="size-10 object-scale-down"
    />
    <div class="text-slate-600 mt-2 text-xs font-semibold dark:text-slate-400">
        {skillsTypeName[skill.type]}
    </div>
    <span>{skill.name}</span>
</div>
