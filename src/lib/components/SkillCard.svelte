<script lang="ts">
  import { pb } from "$db/pocketbase";
  import { skillsTypeName } from "$stores/utils";
  import type { SkillsResponse } from "$db/pocketbase-types";
  import { openModal } from "$lib/modals.svelte";

  let {
    skill,
  }: {
    skill: SkillsResponse;
  } = $props();

  let shadowColor = skill.master
    ? "shadow-md shadow-yellow-500/50 border border-yellow-200 dark:border-yellow-800 dark:shadow-yellow-800/50"
    : "shadow-md hover:shadow-xl";

  function cardPressed() {
    openModal("SkillModal", {
      skill,
    });
  }

  function onKeyPress(e: KeyboardEvent) {
    if (e.key === "Enter") cardPressed();
  }
</script>

<!-- svelte-ignore a11y_interactive_supports_focus -->
<div
  role="button"
  class="card bg-base-100 cursor-pointer w-full p-4 max-w-sm active:scale-90 hover:-translate-y-2 active:shadow-inner transition-all {shadowColor}"
  onkeypress={onKeyPress}
  onclick={cardPressed}
>
  <img
    src={pb.files.getURL(skill, skill.image)}
    alt="{skill.name} logo"
    class="size-10 object-scale-down"
  />
  <div class="text-slate-600 mt-2 text-xs font-semibold dark:text-slate-400">
    {skillsTypeName[skill.type]}
  </div>
  <span>{skill.name}</span>
</div>
