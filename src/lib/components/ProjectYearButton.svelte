<script lang="ts">
  let {
    year,
    projectsCount,
  }: {
    year: string;
    projectsCount: number;
  } = $props();
</script>

<div
  class="bg-card-year-pattern shadow-xl bg-primary text-white font-mono w-full h-full flex flex-col justify-end items-end gap-2 scale-90 p-6"
>
  <h2 class="text-6xl font-black">
    {year}
  </h2>
  <span class="text-xl">
    {projectsCount} projets
  </span>
</div>
